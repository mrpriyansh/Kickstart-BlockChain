import React, { useState } from 'react';
import { Form, Input, Button, Message } from 'semantic-ui-react';
import campaign from '../ethereum/campaign';
import web3 from '../ethereum/web3';
import { Router } from '../routes';

function ContributeForm ({address}) {
    const [value, setValue] =useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const onSubmit = async(event) =>{ 
        setIsLoading(true);
        setErrorMessage('');
        const campaign1 = campaign(address);
        try{
            const accounts = await web3.eth.getAccounts();
            await campaign1.methods.contribute().send({
                from: accounts[0],
                value: web3.utils.toWei(value, 'ether')
           });
            Router.replaceRoute(`/campaigns/${address}`)
        } catch(err){
            setErrorMessage(err.message);
            console.log(err);
        } finally {
            setIsLoading(false);
        }
    }
    return(
        <Form onSubmit ={onSubmit} error={!!errorMessage}>
            <Form.Field>
                <label>Amount to Contribute</label>
                <Input label="ether" labelPosition="right" value={value} onChange={event=>{setValue(event.target.value)}}/>
            </Form.Field>
            <Message error header="Oops!" content = {errorMessage} />
            <Button primary loading={isLoading}>
                Contribute
            </Button>
        </Form>
    )
}

export default ContributeForm;