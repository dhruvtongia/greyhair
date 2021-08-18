import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import AcUnitIcon from '@material-ui/icons/AcUnit';
import '../App.css'


const Index = () => {
    return (
        <>
        <div>
            <div className="showcase">
                <img src="images/depressedman.jpg" alt="" />
                <img src="images/oldtalkingman.jpg" alt="" />
            </div>
        </div>
        <CssBaseline />
        <Container maxWidth="md" style={{marginTop:"2rem"}}>
        <Typography component="div" variant="h6" gutterBottom >
      
            In this world , where people have lost there loved ones, are being fired from the company and with lots of competition
            in the market , anixety and depression have taken oven people.They have no one to talk to,to share their sorrows or to listen someones advice. On the other hand, in this new normal , people working from home
            are not able to give proper time and attention to their old parents. The only thing that a person wants in his last decades or years
            is to spend time with  their loved ones. This is where this app comes. It is platform where the depressed youth can connect with the 
            experienced, happy to talk and help, old people. They can guide the young generation,lift them up from depression and anxiety and,take  
            them towards a better future. In this way, both the communities can be helping hands for each other.
        </Typography>
        <Typography component="div"  paragraph>
            <AcUnitIcon/>  So register as a Mentor or a Mentee and lets make this world a better, happier place.
        </Typography>
        </Container>
        </>
           
    )
}

export default Index
