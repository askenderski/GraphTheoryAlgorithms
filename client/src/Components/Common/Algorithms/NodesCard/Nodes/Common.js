export function Header({index, children}) {
    return (
        <th>
            {index}
            {children}
        </th>
    );
}