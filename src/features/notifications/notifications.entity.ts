export interface INotification {
  datetime: string;
  description: string;
  do_not_remind: boolean;
  id: string;
  reminder_type: string;
  manipulation_type_id: number;
  pet_id: number;
}
