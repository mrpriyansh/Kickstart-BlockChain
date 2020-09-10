import React, { useEffect } from 'react';
import { Card, Button } from 'semantic-ui-react';
import Layout from '../components/Layout';
import factory from '../ethereum/factory';
import {Link} from '../routes';
function CampaignIndex (props) {

  
  // useEffect(()=>{
  //   async function fetchData(){
      
  //     const campaigns = await factory.methods.getDeployedCampaigns().call();
  //     console.log(campaigns);
  //   }
  //   fetchData();
  // }, [])
  const renderCampaigns=() =>{
    const items = props?.campaigns.map(address => {
      return {
        header: address,
        description: <Link route={`/campaigns/${address}`} ><a> View Campaign </a></Link>,
        fluid: true
      };
    })
    return <Card.Group items={items} />
  }
  return (
    <Layout>
    <div>
        <h3>Open Campaigns</h3>
        <Link route="/campaigns/new">
            <a>
              <Button 
                floated="right" 
                content="Create Campaign"
                icon="add circle"
                primary
              />
          </a>
        </Link>
        {renderCampaigns()}
      </div>
    </Layout>
  )
}

CampaignIndex.getInitialProps = async() => {
  const campaigns = await factory.methods.getDeployedCampaigns().call();
  return {campaigns};
}

export default CampaignIndex;