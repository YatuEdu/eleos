interface EleosTitleProps {
    text: string;
    classNames?: string;
}

const EleosTitle: React.FC<EleosTitleProps> = ({text }) => {
    return (
    <div className={"mb-4 ml-4"}>
        <h1 style={{ fontSize: '2rem', color: 'inherit' }}>{text}</h1>
    </div>
    )
}

export default EleosTitle