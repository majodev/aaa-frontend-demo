import * as React from "react";
import styled from "styled-components";
import { observer } from "mobx-react";
import * as mui from "material-ui";
import * as _ from "lodash";

import * as i18n from "../../i18n/util";
import beerState from "../../state/beersState";

interface IProps {
    beerId: number;
}
interface IState {
    commentText: string;
    errorText: string | null;
    changed: boolean;
}

@observer
export default class Component extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);

        const initialComment = beerState.commentsMap.get(`${props.beerId}`);

        this.state = {
            commentText: initialComment ? initialComment : "",
            errorText: null,
            changed: false
        };
    }

    componentWillReceiveProps(nextProps: IProps) {
        if (this.props.beerId !== nextProps.beerId) {

            const otherComment = beerState.commentsMap.get(`${nextProps.beerId}`);

            this.setState({
                commentText: otherComment ? otherComment : "",
                errorText: null,
                changed: false
            });
        }
    }

    onCommentTextUpdate = (e: React.ChangeEvent<{ value: string }>) => {

        const userValue = e.target.value;
        let errorText = null;

        // validate and set error texts
        if (userValue !== _.trim(userValue)) {
            errorText = "Comment can't start or end with a space!";
        } else if (userValue !== userValue.split("  ").join(" ")) {
            errorText = "Comment can't have multiple spaces!";
        } else if (userValue.length > 35) {
            errorText = "Comment can't be longer than 35 characters.";
        }

        this.setState({
            commentText: userValue,
            errorText,
            changed: true
        });
    }

    onFormSubmit = (e: React.FormEvent<any>) => {
        e.preventDefault();

        if (this.state.changed === false) {
            return;
        }

        if (this.state.commentText.length === 0) {
            // no comment, delete it if this is the case!
            console.log("submit (delete comment)!");
            beerState.setComment(this.props.beerId, null);
        } else {
            console.log("submit:", this.state.commentText);
            beerState.setComment(this.props.beerId, this.state.commentText);
        }

        this.setState({
            changed: false
        });
    }

    render() {
        return (
            <form onSubmit={this.onFormSubmit} style={{ display: "flex", alignItems: "center" }}>
                <mui.TextField
                    name="commentText"
                    value={this.state.commentText}
                    onChange={this.onCommentTextUpdate}
                    errorText={this.state.errorText}
                />
                <mui.FlatButton
                    disabled={this.state.errorText !== null || this.state.changed === false}
                    label="Submit"
                    primary
                    type="submit"
                />
            </form>
        );
    }
}
