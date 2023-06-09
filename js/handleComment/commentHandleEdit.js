import { db } from "../subPage/subApp.js";
import { Comment } from "./Comment.js";
import { renderUpdatedComment } from "./commentHandleUpdate.js";

// 댓글 수정 삭제 버튼 핸들링
function handleCommentEdit({ target }) {
    // 수정 버튼 클릭하면 동작하는 부분
    if (target.matches(".edit")) {
        // 댓글 수정
        // alert(target.parentNode.id);
        const { id, content, userId, userPassword, regDate } = db.load(
            target.parentNode.id
        );
        const comment = new Comment(id, content, userId, userPassword, regDate);
        let password = prompt("비밀번호를 입력하세요^^", "비밀번호 기억 나시나요..?");

        // 패스워드 검사
        if (comment.validatePassword(password)) {
            renderUpdatedComment(comment.attributes);
        } else {
            alert("비밀번호가 틀렸습니다ㅠ_ㅠ");
        }
    }
    // 삭제 버튼 클릭하면 동작하는 부분
    if (target.matches(".delete")) {
        const parent = document.querySelector("#comment-list");
        const child = document.getElementById(target.parentNode.id);
        db.delete(target.parentNode.id);
        parent.removeChild(child);
    }
}

export { handleCommentEdit };