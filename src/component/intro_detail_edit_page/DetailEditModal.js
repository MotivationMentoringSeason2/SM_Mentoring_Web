import React, {Component} from 'react';
import '../intro_edit_page/modal.css';

class DetailEditModal extends Component{
    constructor(props){
        super(props);
        this.state = { context : '' };
    }

    handleChange(event){
        this.setState({
            context : event.target.value
        });
    }

    handleSubmit(event){
        const { creating } = this.props;
        const {context} = this.state;
        event.preventDefault();
        creating(context);
    }

    render(){
        const {context} = this.state;
        const {creatable, cancel} = this.props;
        const showHideClassName = creatable ? "modal display-block w3-animate-opacity" : "modal display-none w3-animate-opacity";
        return(
            <div className={showHideClassName}>
                <section className="modal-main-comment w3-round-large">
                    <div className="w3-container w3-sand w3-round-large">
                        <h2 className="w3-text-black">소개문 세부 내용을 등록합니다.</h2>
                    </div>
                    <div className="w3-container">
                        <br/>
                        <form onSubmit={this.handleSubmit.bind(this)}>
                            <input className="w3-input" type="text" name="context" onChange={this.handleChange.bind(this)} placeholder="등록할 세부 내용을 입력하세요." value={context} />
                            <br/><br/>
                            <button type="submit" className="w3-button w3-round-large w3-green">세부문 등록하기</button>
                            <br/><br/>
                            <button type="button" className="w3-button w3-round-large w3-red" onClick={() => cancel()}>취소하기</button>
                            <br/><br/>
                        </form>
                    </div>
                </section>
            </div>
        )
    }
}
export default DetailEditModal;