import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import "./CustomerItem.css";
import { words } from '../../Utils/Texts';

interface Props {
    name:string | undefined;
    id:number | undefined;
    deleteCutomer :(id:number)=>void;
    editCustomer :(id:number)=>void;
}
const CustomerItem: React.FC<Props> = ({name,id,deleteCutomer,editCustomer}) => {
  const idValue = id ?? 0;
  const {mainPage:{deleteButtonContent, editeButtonContent}} = words;

  return(
    <ListItem className='item'>
      <ListItemAvatar>
        <Avatar
          alt={`Avatar n°${idValue + 1}`}
          src={`/static/images/avatar/${idValue + 1}.jpg`}
        />
      </ListItemAvatar>
      <ListItemText id={idValue.toString()} primary={name} />
      <div className='inlineButtonsContainer'>
        <Button variant="outlined" color="error" size="small" onClick={() => deleteCutomer(idValue)}> {deleteButtonContent} </Button>
        <Button variant="outlined" color="secondary" size="small" onClick={() => editCustomer(idValue)}> {editeButtonContent} </Button>
      </div>
  </ListItem>
    )
};

export default React.memo(CustomerItem);
