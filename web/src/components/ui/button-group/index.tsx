import React from "react";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import ButtonGroup from "@mui/material/ButtonGroup";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

import { ButtonGroupOption, ReusableButtonGroupProps } from "./button-group.types";

const ReusableButtonGroup: React.FC<ReusableButtonGroupProps> = ({
    options,
    defaultIndex = 0,
    onPrimaryClick,
    disabledOptions = [],
    variant = "contained",
    color = "primary",
    sx = {},
}) => {
    const [open, setOpen] = React.useState<boolean>(false);
    const anchorRef = React.useRef<HTMLDivElement>(null);
    const [selectedIndex, setSelectedIndex] = React.useState<number>(defaultIndex);

    const handlePrimaryClick = () => {
        if (onPrimaryClick) {
            onPrimaryClick();
        }
        if (options[selectedIndex]?.onClick) {
            options[selectedIndex].onClick();
        }
    };

    const handleMenuItemClick = (
        event: React.MouseEvent<HTMLLIElement, MouseEvent>,
        index: number
    ) => {
        setOpen(false);
        if (options[index].onClick) {
            options[index].onClick();
        }
    };

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event: Event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
            return;
        }

        setOpen(false);
    };

    return (
        <React.Fragment>
            <ButtonGroup
                variant={variant}
                color={color}
                ref={anchorRef}
                aria-label="Reusable button group with a nested menu"
                sx={sx}
            >
                <Button
                    onClick={handlePrimaryClick}
                    disabled={disabledOptions.includes(selectedIndex)}
                >
                    {options[selectedIndex]?.label || "Select"}
                </Button>
                <Button
                    size="small"
                    aria-controls={open ? "reusable-button-group-menu" : undefined}
                    aria-expanded={open ? "true" : undefined}
                    aria-label="select option"
                    aria-haspopup="menu"
                    onClick={handleToggle}
                    disabled={disabledOptions.includes(selectedIndex)}
                >
                    <ArrowDropDownIcon />
                </Button>
            </ButtonGroup>
            <Popper
                sx={{ zIndex: 1300 }}
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
            >
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{
                            transformOrigin:
                                placement === "bottom" ? "center top" : "center bottom",
                        }}
                    >
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList id="reusable-button-group-menu" autoFocusItem>
                                    {options.map((option: ButtonGroupOption, index: number) => (
                                        <MenuItem
                                            key={option.label}
                                            disabled={disabledOptions.includes(index)}
                                            selected={index === selectedIndex}
                                            onClick={(event) => handleMenuItemClick(event, index)}
                                        >
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </React.Fragment>
    );
};

export default ReusableButtonGroup;
