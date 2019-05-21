import {Ticket} from '../../models/ticket.model';

export const UPDATE_CURRENT_TICKET = '[Tickets] Update current ticket';
export const SAVE_CURRENT_TICKET_COMMENT = '[Tickets] Save current ticket comment';

export function updateCurrentTicketAction(ticket: Ticket) {
  return {
    type: UPDATE_CURRENT_TICKET,
    payload: { ticket },
  };
}

export function saveCurrentTicketCommentAction(comment: Comment, ticketId: string) {
  return {
    type: SAVE_CURRENT_TICKET_COMMENT,
    payload: { comment, ticketId },
  };
}
