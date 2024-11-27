import { useNavigate } from "react-router-dom";
import { CustomBreadcrumbsProps } from "./bread-crumbs.types";

import React from "react";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import "./bread-crumbs.styles.scss";

const CustomBreadcrumbs: React.FC<CustomBreadcrumbsProps> = ({ options }) => {
    const navigate = useNavigate();
    const handleClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, path?: string) => {
        if (path) {
            navigate(path);
        }
    };

    return (
        <Breadcrumbs aria-label="breadcrumb" separator={<ChevronRightIcon />}>
            {options.map((option, index) => {
                const isLast = index === options.length - 1;

                if (!isLast && option.path) {
                    return (
                        <Link
                            key={index}
                            underline="none"
                            color="inherit"
                            href={option.path}
                            className="bread-crumbs__link"
                            onClick={(e) => {
                                e.preventDefault();
                                handleClick(e, option.path);
                            }}
                        >
                            {option.icon && (
                                <span className="bread-crumbs__iconSpan">{option.icon}</span>
                            )}
                            {option.label}
                        </Link>
                    );
                } else {
                    return (
                        <Typography
                            key={index}
                            color="text.primary"
                            className="bread-crumbs__iconSpan"
                        >
                            {option.icon && (
                                <span className="bread-crumbs__iconSpan">{option.icon}</span>
                            )}
                            {option.label}
                        </Typography>
                    );
                }
            })}
        </Breadcrumbs>
    );
};

export default CustomBreadcrumbs;
