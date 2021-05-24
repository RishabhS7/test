import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { web3Actions } from "../../actions"
import InfiniteScroll from 'react-infinite-scroll-component'

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      web3Data: null,
      nftContractInstance: null,
      newNFTURI: null,
      isApproved: false,
      creatorTokenIds: null,
      ethEnabled: false,
      nfts: [],
      selectedFile: null,
      cards: [],
      hasMore: false,
      tokenCopies: 0,
      tokenURI: null,
      isLogout: false
    };
  }

  static async getDerivedStateFromProps(nextProps, prevState) {
    let { web3Data } = nextProps;
    if (web3Data !== prevState.web3Data) return { web3Data: web3Data };
    else return null;
  }

  async componentDidUpdate(prevProps, prevState) {
    console.log(this.props);
    let { web3Data, nftContractInstance } = this.props;

    if (web3Data !== prevProps.web3Data)
      this.setState({ web3Data: web3Data }, () => {
        if (nftContractInstance)
          this.setUserNFTData(nftContractInstance, web3Data);
      });
    if (nftContractInstance !== this.state.nftContractInstance) {
      this.setState({ nftContractInstance }, () => {
        this.setGeneralNFTData(nftContractInstance);
        if (web3Data) this.setUserNFTData(nftContractInstance, web3Data);
      });
    }
  }

  componentDidMount() {
    const { web3Data, nftContractInstance } = this.props;
    console.log(nftContractInstance);
    if (!web3Data) this.props.getWeb3();
    else this.setState({ web3Data: web3Data });
    this.props.getNFTContractInstance();


    // set initial cards
    this.setState({ cards: Array.from({ length: 8 }), hasMore: true }, () => {
      console.log('after set state : ', this.state.cards)
    })
  }
  async setUserNFTData(nftContractInstance, web3Data) {
    const creatorTokenIds = await nftContractInstance.methods
      .viewCreatorTokenIds(web3Data.accounts[0])
      .call();

    const balanceOfEdition = await nftContractInstance.methods
      .balanceOf(web3Data.accounts[0], 0)
      .call();

    const isApproved = await nftContractInstance.methods
      .isApproved(web3Data.accounts[0])
      .call();

    this.setState({
      creatorTokenIds: creatorTokenIds,
      balanceOfEdition: balanceOfEdition,
      isApproved: isApproved,
    });

    const viewCreatorTokenIds = await nftContractInstance.methods
      .viewCreatorTokenIds(web3Data.accounts[0])
      .call();

    viewCreatorTokenIds.map(async (id) => {
      const balanceOf = await nftContractInstance.methods
        .balanceOf(web3Data.accounts[0], id)
        .call();
      const tokenURI = await nftContractInstance.methods.tokenURI(id).call();
      const owner = await nftContractInstance.methods.owner(id).call();
      this.setState({
        nfts: [
          ...this.state.nfts,
          { id: id, balanceOf: balanceOf, tokenURI: tokenURI, owner: owner },
        ],
      });
    });
  }
  async setGeneralNFTData(nftContractInstance) {
    const adminAddress = await nftContractInstance.methods.admin().call();
    console.log(adminAddress);
  }
  async mintNFT() {
    const { web3Data, nftContractInstance, newNFTURI } = this.state;
    await nftContractInstance.methods
      .mintEditionToken(newNFTURI)
      .send({ from: web3Data.accounts[0] })
      .on("transactionHash", (hash) => {
        // this.onTransactionHash(hash);
        console.log(hash);
      })
      .on("receipt", (receipt) => {
        this.onReciept();
      })
      .on("error", (error) => {
        this.onTransactionError(error);
      });
  }
  async mintTokenCopies() {
    const { web3Data, nftContractInstance, tokenURI, tokenCopies } = this.state;
    if(!tokenURI){
      alert('Enter token uri')
      return false
    }
    if(tokenCopies === 0){
      alert('Enter token copie number')
      return false
    }
    await nftContractInstance.methods
      .mintTokenCopies(tokenCopies, tokenURI)
      .send({ from: web3Data.accounts[0] })
      .on("transactionHash", (hash) => {
        // this.onTransactionHash(hash);
        console.log(hash);
      })
      .on("receipt", (receipt) => {
        console.log('- receipt : ', receipt)
      })
      .on("error", (error) => {
        console.log(' transaction error : ', error)
      });
      this.setState({tokenCopies: 0, tokenURI: null})
  }
  onReciept() {}

  onFileChange = (event) => {
    if(event.target.files[0].size > 307200){
      alert('File size must under 30MB.!')
      return false
    }
    this.setState({ selectedFile: event.target.files[0] });
  };

  onFileUpload = () => {
    const formData = new FormData();
    const { selectedFile } = this.state;
    if (!selectedFile) {
      alert("upload a file");
      return false;
    }
    formData.append("file", selectedFile, selectedFile.name);
    // submit formData
  };

  fetchMoreCards = () => {
    if(this.state.cards.length > 25){
      this.setState({ hasMore: false })
      return;
    }
    setTimeout( () => {
      // add 5 more cards : call api to load another records
      this.setState({ cards: this.state.cards.concat(Array.from({ length: 5 }))})
    }, 2000)
  }

  signoutHandler = () => {
    localStorage.clear()
    this.setState({ isLogout: true })
  }

  render() {
    const { isLogout, web3Data, newNFTURI, isApproved, nfts, cards, hasMore, tokenCopies, tokenURI } = this.state;
    if(isLogout){
      return <Redirect to="/" />
    }
    return (
      <div>
        <h3>You are logged in.!</h3>
        <button onClick={this.signoutHandler}>Signout</button>
        <br/><br/>

        <button
          value="Connet to Metamask"
          onClick={() => this.props.enableMetamask()}
        >
          Connect to Metamask
        </button>
        <h2>
          Your wallet address is :{" "}
          {web3Data ? web3Data.accounts[0] : "fetching.."}
        </h2>
        {isApproved ? (
          <h2>Your profile is approved by admin</h2>
        ) : (
          <h2>Your profile is not approved by admin.</h2>
        )}
        <h2>{nfts?"Total listed NFT's are : ":"There is no NFT's "}</h2>
        <p>
          {nfts.map((nft) => (
            <li key={nft.id}>
              tokenURI : {nft.tokenURI}
              <br/>
              id: {nft.id}, Balance : {nft.balanceOf} , Owner : {nft.owner}
              <br />
              <img style={{ width: "100px", height: "100px" }} src={nft.tokenURI} />
              <br/><br/>
            </li>
          ))}
        </p>

        <input
          placeholder="Enter url to create new NFT"
          value={newNFTURI}
          onChange={(e) => this.setState({ newNFTURI: e.target.value })}
        />
        <button onClick={() => this.mintNFT()}>Mint your NFT</button>
        
        <br/>
        <br/>
        <input
          placeholder="Enter token URI to create copies"
          value={tokenURI}
          onChange={(e) => this.setState({ tokenURI: e.target.value })}
        />
        <input type="number" placeholder="Enter number of copies" 
          onChange={(e) => this.setState({ tokenCopies: e.target.value })}/>
        <button onClick={() => this.mintTokenCopies()}>Mint Token Copies</button>

        <br />
        <br />
        <input type="file" name="file" onChange={this.onFileChange} 
            accept=".png,.gif,.mp3,.mp4,.webp" />
        <button onClick={this.onFileUpload}>Upload</button>

        <br/>
        <br/>
        <p>Cards Infinite Scroll : </p>
        <InfiniteScroll 
          dataLength={cards.length}
          next={this.fetchMoreCards}
          hasMore={hasMore}
          loader={<p>Loading....</p>}
          endMessage={<p>You have seen it all.!</p>
          }>
          {cards.map((card, index) => 
            <div style={{ height: 40, margin: 3, padding: 4}}>
              card -- {index} 
            </div>
          )}
        </InfiniteScroll>
      </div>
    );
  }
}

const mapDipatchToProps = (dispatch) => {
  return {
    getWeb3: () => dispatch(web3Actions.getWeb3()),
    getNFTContractInstance: () =>
      dispatch(web3Actions.getNFTContractInstance()),
    enableMetamask: () => dispatch(web3Actions.enableMetamask()),
  };
};
const mapStateToProps = (state) => {
  return {
    web3Data: state.fetchWeb3Data,
    nftContractInstance: state.fetchNFTContractInstance,
  };
};
export default connect(mapStateToProps, mapDipatchToProps)(Index);
