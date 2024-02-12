import { Button, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';

import { createContact } from '../../../actions/contactsApi';

import styles from './ContactsForm.module.scss';

const ContactsForm = ({closeModal}) => {
  const {
    register,
    setValue,
    handleSubmit,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await createContact(data);
    } catch (error) {
      console.log(error);
    }finally {
      closeModal();
    }
  };

  return (
    <form className={styles.modal} onSubmit={handleSubmit(onSubmit)}>
      <h2 className={styles.title}>Форма клиента</h2>
      <div className={styles.fields}>
        <TextField
          sx={{minWidth: '25%'}}
          label="Имя"
          variant='outlined'
          {... register('name')}
        />
        <TextField
          sx={{minWidth: '25%'}}
          label="Серия паспорта"
          variant='outlined'
          {... register('numberPassport')}
        />
        <TextField
          sx={{minWidth: '25%'}}
          label="Права"
          variant='outlined'
          {... register('roleContactId')}
        />
        <TextField
          sx={{minWidth: '25%'}}
          label="Кем выдан"
          variant='outlined'
          {... register('issuedBy')}
        />
        <TextField
          sx={{minWidth: '25%'}}
          label="Комментарий"
          variant='outlined'
          {... register('comment')}
        />
        <DatePicker
          label="Дата выдачи"
          sx={{ borderRadius: '4px' }}
          onChange={(date) => (
            setValue('dateIssuePassport', dayjs(date).format('DD.MM.YYYY'))
          )}
        />
      </div>
      <TextField
        type="file"
        InputLabelProps={{ shrink: true }}
        sx={{minWidth: '25%'}}
        label="Фото"
        variant='outlined'
        size="small"
        {... register('photos')}
      />
      <Button
        variant="contained"
        size="medium"
        className={styles.button}
        type="submit"
      >
        Добавить
      </Button>
    </form>
  );
};

export default ContactsForm;
