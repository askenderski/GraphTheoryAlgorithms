export function Header({index, children}) {
    return (
        <th key={index}>
            {index}
            {children}
        </th>
    );
}