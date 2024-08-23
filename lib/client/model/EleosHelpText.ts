import { Language, HelpTextId, HelpText, HelpTextObject } 
                from "@/lib/client/model/EleosMisc";
import { EleosAssetDistributionGrandScheme } 
                from "./EleosDataTypes";

const MULTIPLE_INHERITOR_PHRASE = 'children evenly'
const INHERITOR_REPLACEMENT = '%%'
const MULTIPLE_INHERITOR_PHRASE_CN = '孩子平均分配'

const assetDistributionSchemeText_replacement = [
    MULTIPLE_INHERITOR_PHRASE,
    MULTIPLE_INHERITOR_PHRASE_CN
]

const assetDistributionSchemeText = [
    {
        enum: EleosAssetDistributionGrandScheme.simple, 
        text: [
            'All assets go to other spouse when one spouse dies and to %% when both die',
            '当夫妻一方去世时，所有资产都归另一方所有；夫妻都去世后，所有资产都给%%'
        ],
        text2: [
            'All assets go to %% when the principal dies',
            '当遗产主人去世后，所有资产都给%%'
        ],
        replacement: []
    },   
    {
        enum: EleosAssetDistributionGrandScheme.complex, 
        text: [
            'Some assets need complex and precise distribution rules',
            '有些资产需要复杂、精确的分配规则'
        ],
    }
]

const ENUM_lABLES = [
     {
        enumName: 'EleosAssetDistributionGrandScheme',
        data: assetDistributionSchemeText
    },
]


class EleosHelpText {
    private lang: Language = Language.En

    private static helpTextMap: Map<HelpTextId, HelpText[]> = new Map<HelpTextId, HelpText[]>([
        [HelpTextId.EmailUsage, 
            [
                {
                    subject: 'Privacy Policy',
                    brief: `We will collect some information in order to assit you to create the last will.
                        We use email to uniquely identify a user. However, we will not use your information, inclusing your email,
                        for any other purpose.`,
                    all:''
                
                },
                {
                    subject: '隐私政策',
                    brief: `我们将收集一些信息，以帮助您创建遗嘱。我们使用电子邮件来唯一标识用户。但是，我们不会将您的信息，包括您的电子邮件，用于任何其他目的。`,
                    all:''
                }
            ]
        ],
        [HelpTextId.Marriage, 
            [
                {
                    subject: 'Marriage',
                    brief: `Marriage is a legal contract between two people. It is important to understand the legal implications of marriage.`,
                    all:''
                },
                {
                    subject: '婚姻',
                    brief: `婚姻是两个人之间的法律合同。了解婚姻的法律含义很重要。`,
                    all:''
                }
            ]
        ],
        [HelpTextId.Marriage2, 
            [
                {
                    subject: 'Marriage',
                    brief: `Marriage is a legal contract between two people. It is important to understand the legal implications of marriage.`,
                    all:''
                },
                {
                    subject: '婚姻',
                    brief: `婚姻是两个人之间的法律合同。了解婚姻的法律含义很重要。`,
                    all:''
                }
            ]
        ],
        [HelpTextId.Childrens, 
            [
                {
                    subject: 'Importance of Adding Children as Heirs',
                    brief: `It is important to add all your children, including the biological children from all your marriges, and all your adopted chailren if any, so that they can be included in your estate plan.
                Even if you want to exclude one or more children from inheriting your estate, please add them as well and specify the properties they are not to inherit.
                If you do not have children, you can skip this step.`,
                all:`<h1>Importance to listing all children</h1><p>
               When creating a will, you must list all your children, even if some of them are not inheriting any property. This is often done to acknowledge their existence and to make it clear that they 
               have not been unintentionally omitted.
               <h2>For exaple</h2>Eleos will put this clause in your will : I have three children: John Wong, Jane Wong, and Robert Wong. I am intentionally not providing any inheritance to Robert Wong, as he is financially 
               independent and have agreed to this arrangement.</p> <p>This explicit mention can help prevent potential disputes or claims of oversight. Answering all the questions presented by Eleos application will 
               ensure it meets all legal requirements and reflects your wishes accurately.</p>`
                },
                {
                    subject: '孩子在遗嘱中的重要性',
                    brief: `这是您可以将您的孩子添加为继承人的地方。请添加所有的孩子，包括您的所有婚姻中的亲生子女，以及所有的收养子女， 以便他们可以包括在您的财产计划中。
                即使您不计划某个或多个孩子继承您的财产，也请添加他们。 
                如果您没有孩子，您可以跳过此步骤。`,
                    all:`<h1>列出所有孩子的重要性</h1><p>创建遗嘱时，您必须列出所有的孩子，即使其中一些孩子不继承任何财产。通常这样做是为了承认他们的存在，并明确表明他们没有被无意中遗漏。</p><h2>例子</h2><p>
                    我有三个孩子：约翰·多伊，简·多伊和罗伯特·多伊。我故意不为简·多伊和罗伯特·多伊提供任何继承权，因为他们经济独立并同意这种安排。</p><p>这种明确的提及可以帮助防止潜在的争议或遗漏索赔。在起草遗嘱时，始终与法律专业人士咨询，
                    以确保其符合所有法律要求并准确反映您的意愿。</p>`
                }
            ]
        ],
        [HelpTextId.Guardians, 
            [
                {
                    subject: 'Guardians',
                    brief: `Guardians are people who take care of children when their parents are not able to.`,
                    all:''
                },
                {
                    subject: '监护人',
                    brief: `监护人是在父母无法照顾孩子时照顾孩子的人。`,
                    all:''
                }
            ]
        ],
        [HelpTextId.Eexcutor, 
            [
                {
                    subject: 'Executor',
                    brief: `Executor is the person who will carry out the instructions in the will.`,
                    all:''
                },
                {
                    subject: '执行人',
                    brief: `执行人是将执行遗嘱中指示的人。`,
                    all:''
                }
            ]
        ],
        [HelpTextId.AssetBankAccountHelpText, 
            [
                {
                    subject: 'Bank Account',
                    brief: `Bank account is a financial account maintained by a bank for a customer.`,
                    all:`It is generally a good idea to include bank accounts in a will. Including bank accounts ensures that the executor of your estate has clear instructions on how to distribute the funds. Here are some key points to consider:
Advantages of Including Bank Accounts in a Will:
Clarity: Specifies who should receive the funds, reducing potential disputes among heirs.
Legal Authority: Gives the executor the legal authority to access and distribute the accounts according to your wishes.
Complete Estate Plan: Ensures that all assets, including bank accounts, are covered in your estate plan.`
                },
                {
                    subject: '银行账户',
                    brief: `银行账户是银行为客户维护的金融账户。`,
                    all:''
                }
            ]
        ],
        [HelpTextId.AssetRealEstateHelpText, 
            [
                {
                    subject: 'Real Estate',
                    brief: `Real estate is property consisting of land and the buildings on it.`,
                    all:''
                },
                {
                    subject: '房地产',
                    brief: `房地产是由土地和上面的建筑物组成的财产。`,
                    all:''
                }
            ]
        ],
        [HelpTextId.AssetLifeInsuranceHelpText, 
            [
                {
                    subject: 'Life Insurance',
                    brief: `Life insurance is a contract between an insurer and a policyholder.`,
                    all:''
                },
                {
                    subject: '人寿保险',
                    brief: `人寿保险是保险人和投保人之间的合同。`,
                    all:''
                }
            ]
        ],
        [HelpTextId.AssetRetirementHelpText, 
            [
                {
                    subject: 'Retirement Account',
                    brief: `Retirement account is a type of account that you save money for retirement.`,
                    all:''
                },
                {
                    subject: '退休账户',
                    brief: `退休账户是一种您为退休存钱的账户。`,
                    all:''
                }
            ]
        ],
        [HelpTextId.AssetInvestmentHelpText, 
            [
                {
                    subject: 'Investment Account',
                    brief: `Investment account is a type of account that you invest money in.`,
                    all:''
                },
                {
                    subject: '投资账户',
                    brief: `投资账户是您投资的一种账户。`,
                    all:''
                }
            ]
        ],
        [HelpTextId.AssetOtherHelpText, 
            [
                {
                    subject: 'Other Assets',
                    brief: `Other assets are assets that are not included in other categories.`,
                    all:''
                },
                {
                    subject: '其他资产',
                    brief: `其他资产是不包括在其他类别中的资产。`,
                    all:''
                }
            ]
        ],
        [HelpTextId.Id3, 
            [
                {
                    subject: 'Id3',
                    brief: `Id3 is a test.`,
                    all:''
                },
                {
                    subject: 'Id3',
                    brief: `Id3 is a test.`,
                    all:''
                }
            ]
        ],
    ])
    
    private getMoreHelpUrl(id: number): string {
        return ` <a href="/help?id=${id}&lang=${this.lang}" target="_blank">Read more ...</a>`
    }

    public static getHelpTextAll(id: number, lang: number): HelpTextObject | undefined {
        const textEntry: HelpText[] | undefined = EleosHelpText.helpTextMap.get(id);

        if (!textEntry) {
            return undefined;
        }
        const index = lang - 1
        const helpBodyHtml = textEntry[index].all ? 
                             textEntry[index].all : 
                            'No help content available'
        const helpBody: HelpTextObject = {
            helpTextBody: helpBodyHtml,
            h2Subject: textEntry[index].subject
        }
        return helpBody
    }


    public getHelpText(id: number): HelpTextObject | undefined {
        const textEntry: HelpText[] | undefined = EleosHelpText.helpTextMap.get(id);

        if (!textEntry) {
            return undefined;
        }
        const index = this.getLangIndex()
        const briefText = textEntry[index].brief
        const helpBodyHtml = textEntry[index].all === '' ? 
                                briefText : 
                                briefText + this.getMoreHelpUrl(id)
        const helpBody: HelpTextObject = {
            helpTextBody: helpBodyHtml,
            h2Subject: textEntry[index].subject
        }
        return helpBody
    }

    /**
     * The UI labels for the enum values can be complex. They are also often language, marriage-status, and number of children dependent.  This method
     * returns the labels for the enum values considering all the conditions.
     * 
     * @param enumName 
     * @param isMarried 
     * @returns 
     */
    public getEnumLables(enumName: string, isMarried: boolean, children: string[]): {label: string, value: any}[] {
        const lanIndex = this.lang - 1
        switch (enumName) {
            case 'EleosAssetDistributionGrandScheme':
                const enumLabelEntry = ENUM_lABLES.find(e => e.enumName === enumName)
                if (enumLabelEntry) {
                    return enumLabelEntry.data.map(e => {
                        let labelText = isMarried ? e.text[lanIndex] : e.text2 ? e.text2[lanIndex] : e.text[lanIndex]
                        // replace the %% with the children phrase
                        if (labelText.includes(INHERITOR_REPLACEMENT)) {
                            if (children.length === 0) {
                                throw new Error('Children are required')
                            } 
                            
                            if (children.length === 1) {
                                labelText = labelText.replace(INHERITOR_REPLACEMENT, children[0])
                            } else {
                                // if there are multiple children, replace the %% with the phrase 'children evenly'
                                labelText = labelText.replace(INHERITOR_REPLACEMENT, assetDistributionSchemeText_replacement[lanIndex])
                            }
                        }

                        return {label: labelText, value: e.enum}
                    })
                }
                throw new Error(`Enum ${enumName} not found`)
        }
        return []
    }

    private getLangIndex(): number{
        return this.lang === Language.En ? 0 : 1
    }

    /**
     * Set the language of the help text
     */
    setLanguage(lang: Language) {
        this.lang = lang
    }

    get language(): Language {
        return this.lang
    }
}

export default EleosHelpText
