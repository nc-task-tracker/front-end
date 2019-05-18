import {Ticket} from '../../models/ticket.model';

export const UPDATE_CURRENT_TICKET = '[Tickets] Update current ticket';
export const UPDATE_CURRENT_TICKET_SUCCESS = '[Tickets] Update current ticket success';
// export const SAVE_COMMENT = '[Comments] Save commment';
// export const SAVE_COMMENT_SUCCESS = '[Comments] Save commment success';

export const updateCurrentTicketAction = (ticket: Ticket) => ({
  type: UPDATE_CURRENT_TICKET,
  payload: {ticket}
});

//
// export const saveCommentAction = (comment: Comment) => ({
//   type: SAVE_COMMENT,
//   payload: {comment}
// });
//
// export const saveCommentSuccessAction = (comment: Comment) => ({
//   type: SAVE_COMMENT_SUCCESS,
//   payload: {comment}
// });
