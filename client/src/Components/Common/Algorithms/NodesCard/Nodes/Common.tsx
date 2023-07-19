interface IHeaderProps extends React.PropsWithChildren {
    label: string;
}

export function Header({label, children}: IHeaderProps) {
    return (
        <th>
            {label}
            {children}
        </th>
    );
}