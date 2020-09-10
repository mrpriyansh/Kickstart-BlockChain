import React from 'react';
import Layout from '../../../components/Layout';
import { Link } from '../../../routes';
import {Button, Table } from 'semantic-ui-react';
import campaign from '../../../ethereum/campaign';
import RequestRow from '../../../components/RequestRow';

function RequestIndex ({address, requestCount, requests, approversCount}) {
    console.log(address);
    const {Header, Row, HeaderCell, Body} = Table;
   
    const renderRows=()=>{
        return requests.map((request, index) => {
            return <RequestRow id={index+1} request={request} key={index} address={address} approversCount={approversCount} />
        })
    }
    return (
        <Layout>
            <h3> Request</h3>
            <Link route={`/campaigns/${address}/requests/new`}>
                <a><Button primary> Add Request</Button></a></Link>
            <Table>
                <Header>
                    <Row>
                        <HeaderCell> ID</HeaderCell>
                        <HeaderCell> Desciption</HeaderCell>
                        <HeaderCell> Amount</HeaderCell>
                        <HeaderCell> Recipient</HeaderCell>
                        <HeaderCell> Approval Count</HeaderCell>
                        <HeaderCell> Approve</HeaderCell>
                        <HeaderCell> Finalize</HeaderCell>
                    </Row>
                </Header>
                <Body>
                    {renderRows()}
                </Body>
            </Table>
        </Layout>
    );
}

RequestIndex.getInitialProps = async(props) => {
    const campaign1= campaign(props.query.address);
    const requestCount = await campaign1.methods.getRequestsCount().call();
    const approversCount = await campaign1.methods.approversCount().call();
    const requests = await Promise.all(
        Array(requestCount).fill().map((element, index)=>{
            console.log(index, +requestCount);
            return campaign1.methods.requests(index).call()
        })
    );
    console.log(requests);
    return {address: props.query.address, requestCount, requests, approversCount};
}

export default RequestIndex;