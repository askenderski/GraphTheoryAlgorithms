import {useHistory} from "react-router-dom";
import {IArticleType, articleColorsMap, articleTextMap} from "../../../../Data/ArticleTypes";
import {validateArticleType} from "../../../../Utilities/Validation/articleTypeValidation";
import {Routes} from "../../../../Data/Routes/routes";

function validateProps({title, description, type}: IArticleProps) {
    if (typeof title !== "string" || title === "") {
        throw new Error("Invalid title");
    }

    if (typeof description !== "string" || description === "") {
        throw new Error("Invalid description");
    }

    validateArticleType(type);
}

interface IArticleProps {
    type: IArticleType,
    description: string,
    title: string
}

export default function Article(props: IArticleProps) {
    validateProps(props);
    const {type, title, description} = props;

    const history = useHistory();

    const algorithmPath = Routes.algorithms.algorithmType.algorithm.fullPath
        .replace(":algorithmType", type.name)
        .replace(":algorithmTitle", title);
    const redirectToAlgorithm = ()=>history.push(algorithmPath);

    return (
        <div>
            <h1 style={{backgroundColor: articleColorsMap.get(type)}}>{articleTextMap.get(type)}</h1>
            <h2>{title}</h2>
            <p>{description}</p>
            <button onClick={redirectToAlgorithm}>Go to algorithm</button>
        </div>
    );
};