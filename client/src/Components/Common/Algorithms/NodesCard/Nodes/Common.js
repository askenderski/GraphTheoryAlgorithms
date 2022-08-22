export function Header({label, children}) {
    return (
        <th>
            {label}
            {children}
        </th>
    );
}