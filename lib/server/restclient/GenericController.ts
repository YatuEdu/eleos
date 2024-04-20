import { NextRequest, NextResponse }    
                from "next/server";
import { ZodType }                      
                from "zod";
import { authOptions }                  
                from "@/lib/server/utilities/sec/authOptions"
import { getServerSession }             
                from "next-auth/next"
import   SecurityContext                     
                from "@/lib/common/sec/SecurityContext"

/**
 * Common code for all eleos web handler (which is similar to a controller in MVC terminology).
 * This class does two things:
 * 1) input data validation using zod
 * 2) handles errors by try/catch all possible exceptions, and convert them into user-friendly error messages, 
 *    and log them as dev-friendly messages for savvy developers to nail down the cause of it at the backend.
 */
class GenericController {
    #schema: unknown
    #request: NextRequest 
    #securityContext: SecurityContext | undefined | null

    /**
     * Construct a SavvryController instance by taking REST reuest object and a zod schema, which is the signature of 
     * the REST Hanlers's JSON shape and all data types for each and evry field.
     * 
     * Note that in theory this constructor will never throw, which is the important point to achieve.
     * 
     * @param schema 
     * @param request 
     */
    constructor(schema: unknown, request: NextRequest) {
        this.#schema = schema
        this.#request = request;
    }

    /**
     * Initialize required state variables for child class instances to function.
     */
    async _init() {
        const session  = await getServerSession(authOptions)
        if (!session) {
            // if not signed in, no can do
            throw NextResponse.json({success: false, response: {errors: ['Permission denied'] }}, { status: 401 })
        }

        this.#securityContext = new SecurityContext(session)
    }

    /**
     * Generic method for all REST service to serve the request.  We try to use this method instead of specific method to reduce code duplication
     * 
     * @param req   REST Client request
     * @param C     Type T needs a consructor C
     * @returns      Promise<NextResponse>
     */
    static async serve<T extends GenericController> (req: NextRequest, C: { new (req: NextRequest): T }) {
        const service = new C(req)
        return await service.handleRestRequest()
    }

    /**
     * Request handler templete for all REST calls.  This handler is the "only" place we try-catch errors and convert them into message
     * body JSON format in order for users to get informed about the cause of error and ways to fix it.
     * 
     * TODO: error-handling is a Cross-cutting concerns for all REST endpoint.  Therfore it is better to be an AOP aspect in the future 
     * when NEXT JS provides an AOP way to handle error in one place just like that of SpringBoot. For now we use OOP approach and for
     * all REST controllers to derive from it and it is elegant enough although not perfect.
     */
    async handleRestRequest():  Promise<NextResponse> {
        try {
            if (!this._hasValidSchema()) {
                // this is not a runtime validation but rather design time validation
                // we want to make a service class's request schema explicit to reduce runtime error
                throw "designed time error found: invalid schema used for this class"
            }

            const zodSchema = this.#schema as ZodType<any>
            const inputRequestObject = await this.#request.json()

            // input validation
            const validRequestBody = zodSchema.parse(inputRequestObject);

            // initialize required state variables (such as session) for all derived classes
            await this._init();

            // handle business request by child service class
            return await this._handleServiceRequest(validRequestBody)
        } catch (e) {
            return this.errorToErrorReturnDto(e)
        }
    }

    /**
     * This is a central hub for all kind of exception to be analysed and error DTO generated in one place.
     * 
     * @param e         - error
     * @returns         - user-friendly DTO
     */
    errorToErrorReturnDto(e: unknown): NextResponse {
        // log the messages
        // todo: a real logger needs to be used:
        console.log(e)

       // logger.error(`REST Service encountered an exception : ${e} `);

        // find out if it is a zod error:
        const err = e as any
     
        return NextResponse.json({success: false, body: {code: 0}}, { status: 500 })
    }

    /**
     * The essential service provided by the derived class. The
     * derived class must override this methods or a design-time error will be thrown
     */
    async _handleServiceRequest(requestBody: unknown): Promise<NextResponse> {
        throw "Level 1: Pure virtual function (_handleServiceRequest) must be overriden by child class!";
    }

     /**
     * Make sure the schema conforms to the quired schema for derived types.  The
     * derived class must override this methods or a design-time error will be thrown.
     * 
     */
     _hasValidSchema(): boolean{
        throw "Level 1: Pure virtual function (_hasValidSchema) must be overriden by child class!";
    }

    /**
     * getters
     */

    get schema() { return this.#schema }
    
    get request() { return this.#request }

     /**
     * getters
     */
     get securityContext(): SecurityContext{  
        if (this.#securityContext) {
            return this.#securityContext
        }

        throw Error('Unexpected error from "securityContext" getter')
    }
}

export default GenericController