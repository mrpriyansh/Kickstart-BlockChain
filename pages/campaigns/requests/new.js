import React, {useState} from 'react';
import campaign from '../../../ethereum/campaign';
import {Link, Router} from '../../../routes';
import { Form, Input, Button, Message } from 'semantic-ui-react';
import Layout from '../../../components/Layout';
import web3 from '../../../ethereum/web3';

function RequestNew ({address}) {
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');
    const [recipient, setRecipient] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const onSubmit = async( event ) => {
        event.preventDefault();
        setErrorMessage('');
        setIsLoading(true);
        const campaign1= campaign(address);
        console.log(campaign1);
        try{ 
            const accounts =await web3.eth.getAccounts();
            await campaign1.methods.createRequest(description, web3.utils.toWei(value, 'ether',), recipient)
                    .send({from : accounts[0]});
            Router.pushRoute(`/campaigns/${address}/requests`);
        } catch(err){
            setErrorMessage(err.message);
            console.log(err);
        }
        finally{
            setIsLoading(false);
        }
    }
    return (
        <Layout >
            <Link route={`/campaigns/${address}/requests`}>
                <a>  Back</a>
            </Link>
            <h3> Create a request</h3>
            <Form onSubmit={onSubmit} error={!!errorMessage}> 
                <Form.Field>
                    <label>Description</label>
                    <Input value={description} onChange={event=>{setDescription(event.target.value)}}/>
                </Form.Field>
                <Form.Field>
                    <label>Value in ether</label>
                    <Input value={value} onChange={event=>{setValue(event.target.value)}}/>
                </Form.Field>
                <Form.Field>
                    <label>Recipient</label>
                    <Input value={recipient} onChange={event=>{setRecipient(event.target.value)}}/>
                </Form.Field>
                <Message error header="Oops!" content = {errorMessage} />
                <Button primary loading = {isLoading} >Create!</Button>
            </Form>
        </Layout>
    )
}

RequestNew.getInitialProps= async(props)=>{
    return {address: props.query.address};
}

export default RequestNew;