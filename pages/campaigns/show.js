import React from 'react';
import Layout from '../../components/Layout';
import campaign from '../../ethereum/campaign';
import { Card, Grid, Button } from 'semantic-ui-react';
import web3 from '../../ethereum/web3';
import { Link } from '../../routes';
import ContributeForm from '../../components/ContributeForm';

const CampaignShow = ({minimumContribution, balance, requestCount, approversCount, manager, address}) =>{
    const renderCards = () =>{
        const items = [
            {
                header:manager, 
                meta: 'Address of Manager',
                description: 'The manager createdd this campaign and creates request',
                style: {overflowWrap: 'break-word'}
            },
            {
                header:minimumContribution, 
                meta: 'Minimum Contribution (wei)',
                description: 'You must contribute at least this much wei to become an approver',
                style: {overflowWrap: 'break-word'}
            },
            {
                header:requestCount, 
                meta: 'Number of Requests',
                description: 'A request triees to withdraw money from the Contract. Request must be approved by manager',
                style: {overflowWrap: 'break-word'}
            },
            {
                header:approversCount, 
                meta: 'Number of Approvers',
                description: 'Number of people who have already donated to Contract',
                style: {overflowWrap: 'break-word'}
            },
            {
                header:web3.utils.fromWei(balance, 'ether'), 
                meta: 'Campaign Balance (ether)',
                description: 'This balance is how much money this campaign has left to spend',
                style: {overflowWrap: 'break-word'}
            }
        ];
        console.log(manager);
        return <Card.Group items={items} />;
    }

    return(
        <Layout>
            <h3>Campaign Show</h3>
            <Grid>
                <Grid.Row>
                    <Grid.Column width={10}>
                        {renderCards()}
                    </Grid.Column>
                    <Grid.Column width={6}>
                        <ContributeForm address={address}/>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                <Grid.Column >
                    <Link route={`/campaigns/${address}/requests`}>
                        <a><Button primary>View Requests</Button></a>
                    </Link>
                </Grid.Column>

                </Grid.Row>
            </Grid>
        </Layout>
    )
}

CampaignShow.getInitialProps = async(props) =>{
    const address = props.query.address;
    const campaign1 = campaign(address);
    const summary = await campaign1.methods.getSummary().call();
    return {
        address,
        minimumContribution: summary[0],
        balance: summary[1],
        requestCount: summary[2],
        approversCount: summary[3],
        manager: summary[4]
    };

}
export default CampaignShow;