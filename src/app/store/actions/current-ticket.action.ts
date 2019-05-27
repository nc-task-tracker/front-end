import {Ticket} from '../../models/ticket.model';
import {DELETE_TICKET, DELETE_TICKET_SUCCESS} from './tickets.actions';

export const UPDATE_CURRENT_TICKET = '[Tickets] Update current ticket';
export const SAVE_CURRENT_TICKET_COMMENT_SUCCESS = '[Tickets] Save current ticket comment success';
export const OPEN_SUBTASK = '[Tickets] Open subtask';
export const SAVE_CURRENT_TICKET_COMMENT = '[Tickets] Save current ticket comment';
export const DELETE_CURRENT_TICKET_COMMENT = '[Tickets] Delete current ticket comment';
export const DELETE_CURRENT_TICKET_COMMENT_SUCCESS = '[Tickets] Delete current ticket comment success';

export function updateCurrentTicketAction(ticket: Ticket) {
  return {
    type: UPDATE_CURRENT_TICKET,
    payload: { ticket },
  };
}

export function saveCurrentTicketCommentSuccessAction(comment: Comment, ticketId: string) {
  return {
    type: SAVE_CURRENT_TICKET_COMMENT_SUCCESS,
    payload: { comment, ticketId },
  };
}

export function saveCurrentTicketCommentAction(comment: Comment, ticketId: string) {
  return {
    type: SAVE_CURRENT_TICKET_COMMENT,
    payload: { comment, ticketId },
  };
}

export const deleteCurrentTicketComment = (commentId: string) => ({
  type: DELETE_CURRENT_TICKET_COMMENT,
  payload: {commentId}
});

export const deleteCurrentTicketCommentSuccess = (commentId: string) => ({
  type: DELETE_CURRENT_TICKET_COMMENT_SUCCESS,
  payload: {commentId}
});

