import React from "react";
import {
    Button,
    ButtonGroup,
    getKeyValue,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
} from "@nextui-org/react";
import { PencilIcon, PlusIcon, TrashIcon } from "lucide-react";

type AdminListProps = {
    content: object[];
    columns: { key: string; label: string }[];
    onDelete?: (elem: object) => void;
    onEdit?: (elem: object) => void;
    onAdd?: () => void;
};

function AdminList(props: AdminListProps) {
    return (
        <React.Fragment>
            <Table aria-label={"Admin table"}>
                <TableHeader columns={props.columns}>
                    {(column) => (
                        <TableColumn
                            key={column.key}
                            className={
                                "" + (column.key === "action" && "text-right")
                            }
                        >
                            {column.key !== "action" ? (
                                column.label
                            ) : (
                                <Button
                                    onClick={() => props.onAdd && props.onAdd()}
                                    isIconOnly={true}
                                    color={"primary"}
                                    size={"sm"}
                                >
                                    <PlusIcon size={15} />
                                </Button>
                            )}
                        </TableColumn>
                    )}
                </TableHeader>
                <TableBody items={props.content}>
                    {(item) => (
                        <TableRow className={"group"}>
                            {(column) =>
                                column !== "action" ? (
                                    <TableCell>
                                        {getKeyValue(item, column)}
                                    </TableCell>
                                ) : (
                                    <TableCell
                                        className={
                                            "opacity-0 w-[1%] group-hover:opacity-100"
                                        }
                                    >
                                        <ButtonGroup>
                                            {/* TODO: A ajouter en 1.2.1 */}
                                            <Button
                                                isIconOnly={true}
                                                onClick={() =>
                                                    props.onEdit &&
                                                    props.onEdit(item)
                                                }
                                                color={"primary"}
                                                isDisabled={true}
                                            >
                                                <PencilIcon size={15} />
                                            </Button>
                                            <Button
                                                isIconOnly={true}
                                                onClick={() =>
                                                    props.onDelete &&
                                                    props.onDelete(item)
                                                }
                                                color={"danger"}
                                            >
                                                <TrashIcon size={15} />
                                            </Button>
                                        </ButtonGroup>
                                    </TableCell>
                                )
                            }
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </React.Fragment>
    );
}

export default AdminList;
