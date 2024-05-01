import { Language, HelpTextId, HelpText } 
                from "@/lib/client/model/EleosMisc";


class EleosHelpText {
    private lang: Language = Language.En

    private static helpTextMap: Map<HelpTextId, HelpText> = new Map<HelpTextId, HelpText>([
        [HelpTextId.EmailUsage, 
            {
                en: `We will collect some information in order to assit you to create the last will.
                     We use email to uniquely identify a user. However, we will not use your information, inclusing your email,
                    for any other purpose.`,
                cn: `我们将收集一些信息，以帮助您创建遗嘱。我们使用电子邮件来唯一标识用户。但是，我们不会将您的信息，包括您的电子邮件，用于任何其他目的。`
             } 
        ],
        [HelpTextId.Guardians, 
            {
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
                en: `This is where you can add your children as heirs. 
                It is import to add all your children so that they can be included in your estate plan.
                If you do not have children, you can skip this step.`,
                cn: `这是您可以将您的孩子添加为继承人的地方。
                重要的是要添加所有的孩子，以便他们可以包括在您的财产计划中。
                如果您没有孩子，您可以跳过此步骤。`
            }
        ],
        [HelpTextId.Id3, 
            {
                en: "Help text for ID 3",
                cn: "ID 3的帮助文本"
            }
        ],
        // Add more entries as needed
    ]);

    public getHelpText(id: number): string | undefined {
        const textEntry: HelpText | undefined = EleosHelpText.helpTextMap.get(id);
        //console.log(`textEntry: ${textEntry}`, textEntry)

        if (!textEntry) {
            return undefined;
        }
        return textEntry[this.getLangTag()] || '';
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
