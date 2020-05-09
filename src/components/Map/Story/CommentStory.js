import React from "react";
import { deleteComment } from "../../../actions/pins";
import { delFlagComment } from "../../../actions/auth";
import { useDispatch } from "react-redux";

function CommentStory(props) {
  const dispatch = useDispatch();

  return (
    <>
      {props.isAuthenticated ? <AddCommentForm {...props} /> : ""}
      {props.comment.map((userComment, index) => {
        return (
          <div
            className="card border-primary mb-3 story-comment-card"
            key={userComment.id}
          >
            <div className="card-body">
              <p className="card-text story-comment-text">
                {userComment.description}
              </p>
              <p className="sidebar-story-author">
                posted by:{" "}
                <span className="sidebar-story-username">
                  {userComment.is_anonymous_comment
                    ? "Anonymous"
                    : userComment.username}
                </span>
              </p>
              {props.isAuthenticated ? (
                <FlagButton id={userComment.id} {...props} />
              ) : (
                ""
              )}
              {props.isAuthenticated &&
              (props.user.id === userComment.commenter ||
                props.user.is_moderator ||
                props.user.is_administrator) ? (
                <button
                  type="button"
                  className="btn btn-primary btn-sm default-btn-purple"
                  style={{ float: "right", marginRight: "20px" }}
                  onClick={(e) => {
                    dispatch(deleteComment(userComment.id));
                  }}
                >
                  Delete
                </button>
              ) : (
                ""
              )}
            </div>
          </div>
        );
      })}
    </>
  );
}

export default CommentStory;

const FlagButton = (props) => {
  const dispatch = useDispatch();
  const flagCommentCheck = props.user.flaggerComment.some(
    (userFlagComment) => userFlagComment.comment === props.id
  );
  const flagid = flagCommentCheck
    ? props.user.flaggerComment.filter((a) => a.comment === props.id)
    : "";

  return (
    <>
      {flagCommentCheck ? (
        <button
          onClick={() => dispatch(delFlagComment(flagid[0].id))}
          type="button"
          className="btn btn-primary btn-sm flag-story-btn"
        >
          Remove Flag
        </button>
      ) : (
        <button
          onClick={() => props.toggle(props.id)}
          type="button"
          className="btn btn-primary btn-sm flag-story-btn"
        >
          Flag
        </button>
      )}
    </>
  );
};

const AddCommentForm = (props) => {
  if (props.user) {
    return (
      <div>
        <h4 className="story-comment-header">leave comment</h4>
        <form onSubmit={props.onSubmitComment}>
          <div className="form-group">
            <textarea
              className="form-control"
              id="exampleTextarea"
              rows="3"
              onChange={(e) =>
                props.setuserComment({
                  ...props.userComment,
                  is_anonymous_comment: props.user.is_anonymous_active,
                  description: e.target.value,
                })
              }
            ></textarea>
          </div>
          <button
            type="submit"
            className="btn btn-primary btn-sm default-btn-purple"
            style={{ float: "right" }}
          >
            comment
          </button>
        </form>
      </div>
    );
  } else {
    return null;
  }
};
