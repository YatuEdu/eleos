import { Language, HelpTextId, HelpText, HelpTextObject } 
                from "@/lib/client/model/EleosMisc";
import { EleosAssetDistributionGrandScheme } 
                from "./EleosDataTypes";

                
const assetDistributionSchemeText = [
    {
        enum: EleosAssetDistributionGrandScheme.simple, 
        text: [
            'All assets go to to other spouse when one spouse dies and children evenly when both die',
            '当夫妻一方去世时，所有资产都归另一方所有；夫妻都去世后，所有资产都由孩子平均分配'
        ]
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

    private static helpTextMap: Map<HelpTextId, HelpText> = new Map<HelpTextId, HelpText>([
        [HelpTextId.EmailUsage, 
            {
                subject: 'Privacy Policy',
                en: `We will collect some information in order to assit you to create the last will.
                     We use email to uniquely identify a user. However, we will not use your information, inclusing your email,
                    for any other purpose.`,
                cn: `我们将收集一些信息，以帮助您创建遗嘱。我们使用电子邮件来唯一标识用户。但是，我们不会将您的信息，包括您的电子邮件，用于任何其他目的。`
             } 
        ],
        [HelpTextId.Marriage, 
            {
                subject: 'Importance of Marital Status in a Will',
                en: `Discussing marital status in a will is crucial as it can significantly influence how assets are distributed and how various provisions within the will are executed. 
                    Here’s a detailed look at how marital status can impact the creation and execution of a will.`,
                cn: `在遗嘱中讨论婚姻状况至关重要，因为它可以显著影响资产的分配方式以及遗嘱中的各种规定的执行方式`
             } 
        ],
        [HelpTextId.Marriage2, 
            {
                subject: 'Concluding Thoughts on Marital Status in Estate Planning',
                en: `Marital status significantly impacts estate planning. It’s crucial to consider how this status influences the distribution of assets, tax implications, 
                and legal rights of surviving family members. Regular updates to your will can ensure that it accurately reflects your current situation and wishes,
                 particularly after any changes in marital status. Therefore, we recommend that you join us as a yearly member to keep your will up to date.`,
                cn: `婚姻状况对财产规划产生了重大影响。重要的是要考虑这种状况如何影响资产的分配、税收影响以及幸存家庭成员的法律权利。定期更新您的遗嘱可以确保它准确反映您当前的情况和愿望，
                特别是在婚姻状况发生任何变化之后。因此，我们建议您加入我们作为年度会员，以保持您的遗嘱保持最新。`
             } 
        ],

        [HelpTextId.Guardians, 
            {
                subject: 'Significance of Guardians in a Will',
                en: `The guardians of your minor children are the most important aspect of a will. 
             Most commonly, a single guardian is appointed to ensure clarity and consistency in the upbringing and care of the children. 
             This is often straightforward and avoids potential conflicts that might arise between multiple guardians.`,
                cn: `您未成年子女的监护人是遗嘱中最重要的一部分。
                最常见的情况是指定一个监护人，以确保子女的抚养和照顾方面的清晰性和一致性。
                这通常是简单明了的，避免了可能在多个监护人之间产生的潜在冲突。`
             } 
        ],
        [HelpTextId.Childrens, 
            {
                subject: 'Importance of Adding Children as Heirs',
                en: `This is where you can add your children as heirs. 
                It is important to add all your children so that they can be included in your estate plan.
                If you do not have children, you can skip this step.`,
                cn: `这是您可以将您的孩子添加为继承人的地方。请添加所有的孩子，以便他们可以包括在您的财产计划中。
                即使您不计划某个或多个孩子继承您的财产，也请添加他们。 <br />
                如果您没有孩子，您可以跳过此步骤。`
            }
        ],
        [HelpTextId.Id3, 
            {
                subject: 'Help text for ID 3',
                en: 'Help text for ID 3',
                cn: 'ID 3的帮助文本'
            }
        ],
        // Add more entries as needed
    ]);

    public getHelpText(id: number): HelpTextObject | undefined {
        const textEntry: HelpText | undefined = EleosHelpText.helpTextMap.get(id);
        //console.log(`textEntry: ${textEntry}`, textEntry)

        if (!textEntry) {
            return undefined;
        }
        const helpBody: HelpTextObject = {
                helpTextBody: textEntry[this.getLangTag()],
                h2Subject: textEntry.subject
        }
        return helpBody
    }

    public getEnumLables<E> (e: E, numName: string): {label: string, value: any}[] {
        const lanIndex = this.lang - 1
        switch (numName) {
            case 'EleosAssetDistributionGrandScheme':
                const enumLabelEntry = ENUM_lABLES.find(e => e.enumName === numName)
                if (enumLabelEntry) {
                    return enumLabelEntry.data.map(e => ({label: e.text[lanIndex], value: e.enum}))
                }
                throw new Error(`Enum ${numName} not found`)
        }
        return []
    }

    private getLangTag(): keyof HelpText {
        return this.lang === Language.En ? 'en' : 'cn';
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
