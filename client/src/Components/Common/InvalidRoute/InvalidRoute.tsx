interface IInvalidRouteProps {
    message: string
}

const InvalidRoute: React.ElementType<IInvalidRouteProps> = function({message = "Invalid URL"}) {
    return <div>{message}</div>;
};

export default InvalidRoute;