import * as React from "react";
import styled from "styled-components";
import * as mui from "material-ui";
import { Link } from "react-router-dom";

const StyledLink = styled(Link) `
    text-decoration: none;
`;

interface IProps {
    to: string;
    onClick: () => void;
    title?: string;
    children?: React.ReactNode;
}

export default function (props: IProps) {
    return (
        <StyledLink to={props.to}>
            <mui.MenuItem onClick={props.onClick}>{props.children || props.title}</mui.MenuItem>
        </StyledLink>
    );
}