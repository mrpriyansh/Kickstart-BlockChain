import React, { useState } from 'react';
import {Table, Button} from 'semantic-ui-react';
import web3 from '../ethereum/web3';
import campaign from '../ethereum/campaign';

function RequestRow ({request, id, address, approversCount}) {
    const [isApproveLoading, setIsApproveLoading] = useState(false);
    const {Row, Cell} = Table;
    const onApprove = async(event)=>{
        event.preventDefault();
        setIsApproveLoading(true);
        const campaign1 = campaign(address);
        const accounts=await web3.eth.getAccounts();
        await campaign1.methods.approveRequest(id).send({
            from: accounts[0]
        })
        setIsApproveLoading(false);
    }
    return( 
        <Row>
            <Cell>{id}</Cell>
            <Cell> {request.description}</Cell>
            <Cell> {web3.utils.fromWei(request.value, 'ether')}</Cell>
            <Cell> {request.recipient}</Cell>
            <Cell> {request.approvalCount}/ {approversCount} </Cell>
            <Cell> <Button onClick={onApprove} loading={isApproveLoading} color="green" basic> Approve</Button> </Cell>
            <Cell> <Button> Reject</Button> </Cell>
        </Row>
    )
}

export default RequestRow;