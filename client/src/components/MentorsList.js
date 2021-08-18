import React,{useState,useEffect} from 'react'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import PersonInfo from './PersonInfo'
import { baseUrl } from '../baseUrl';

const useStyles = makeStyles((theme) => ({
    root: {
      flexBasis:"75%",
      marginBottom:"1rem",
    },
    marginTop:{
        marginTop:"2rem",
        marginBottom:"2rem",
    }
  }));
const MentorsList = () => {
    const classes = useStyles();

    const [loading, setloading] = useState(true);
    const [list, setlist] = useState();
    useEffect(() => {
        
        fetch(baseUrl+'/list',{
        method: 'GET',
        headers: {
          //Accept:"application/json",
            "Content-type": "application/json; charset=UTF-8"
        },
        credentials:'include' // bahut important cookies ko bhejne ke liye taki har request pe nayi cooki na ban jaaye
      })
       .then(response => response.json())
       .then((result)=>{
         setlist(result.list);
         setloading(false);
         //console.log(result.list);
       }).catch(err=>{
         console.log(err);
       });
        
    }, [])
    return (
        
            (!loading)?(
        <Container fixed className={classes.marginTop} >
            <Grid container justifyContent="center" spacing={1} >

            {list.map((el, i) =>
                <Grid key={i} item xs={12} md={3} className={classes.root}>
                    <PersonInfo details={el}/>
                </Grid>
            )}
                
            </Grid>
        </Container>):(
          <Container fixed className={classes.marginTop} > <div>Loading....</div></Container>
            )
    )
}

export default MentorsList
