import { genRandCode } from "../../utils";


const TableCell = ({label}) => {
    return ( 
        <td key={genRandCode(5)}>
            {label}
        </td>
     );
}
 
export default TableCell;