import {useHistory} from "react-router-dom";
import {articleColorsMap, articleTextMap} from "../../../../Data/ArticleTypes";
import {validateArticleType} from "../../../../Utilities/Validation/articleTypeValidation";
import {Routes} from "../../../../Data/Routes/routes";

function validateProps({title, description, type}) {
    if (typeof title !== "string" || title === "") {
        throw new Error("Invalid title");
    }

    if (typeof description !== "string" || description === "") {
        throw new Error("Invalid description");
    }

    validateArticleType(type);
}

export default function Article(props) {
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