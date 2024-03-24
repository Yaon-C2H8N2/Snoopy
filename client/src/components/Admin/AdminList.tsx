import React from "react";
import {Button, ButtonGroup, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow} from "@nextui-org/react";

type AdminListProps = {
    content: object[],
    columns: string[],
    onDelete?: () => void,
    onEdit?: () => void,
    onAdd?: () => void,
}

function AdminList(props: AdminListProps) {

    return (
        <React.Fragment>
            <Table>
                <TableHeader>
                    {props.columns.map((column) => (
                        <TableColumn key={"header-" + column}>{column}</TableColumn>
                    ))}
                    <TableColumn className={"w-[10%]"}></TableColumn>
                </TableHeader>
                <TableBody>
                    {props.content.map((line, index) => (
                        <TableRow key={"line-" + index}>
                            {props.columns.map((column) => (
                                <TableCell key={"line-" + index + "-" + column}>{line[column]}</TableCell>
                            ))}
                            <TableCell className={"w-[10%]"}>
                                <ButtonGroup>
                                    <Button size={"sm"}>E</Button>
                                    <Button size={"sm"}>S</Button>
                                </ButtonGroup>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </React.Fragment>
    );
}

export default AdminList;