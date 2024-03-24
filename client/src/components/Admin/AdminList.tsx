import React from "react";
import {getKeyValue, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow} from "@nextui-org/react";

type AdminListProps = {
    content: object[],
    columns: { key: string, label: string }[],
    onDelete?: () => void,
    onEdit?: () => void,
    onAdd?: () => void,
}

function AdminList(props: AdminListProps) {

    return (
        <React.Fragment>
            <Table aria-label={"Admin table"}>
                <TableHeader columns={props.columns}>
                    {(column) => (<TableColumn key={column.key}>{column.label}</TableColumn>)}
                </TableHeader>
                <TableBody items={props.content}>
                    {(item) => (
                        <TableRow>
                            {(column) => (
                                <TableCell>{getKeyValue(item, column)}</TableCell>
                            )}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </React.Fragment>
    );
}

export default AdminList;