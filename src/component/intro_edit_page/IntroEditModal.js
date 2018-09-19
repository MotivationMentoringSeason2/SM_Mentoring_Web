import React, {Component} from 'react';
import './modal.css';

class IntroEditModal extends Component{
    constructor(props){
        super(props);
        this.state = { id : props.data.id, context : props.data.context };
    }

    handleChange(event){
        this.setState({
            context : event.target.value
        });
    }

    handleSubmit(event){
        const { writer, updating } = this.props;
        const {id, context} = this.state;
        if(context.trim() === '') {
            alert("제목은 공백이 존재할 수 없습니다. 다시 입력하세요.");
            event.preventDefault();
        }
        else{
            updating({
                introId : id,
                context : context,
            }, writer);
            event.preventDefault();
        }
    }

    render(){
        const {context} = this.state;
        const {data, cancel} = this.props;
        const showHideClassName = data !== null ? "modal display-block w3-animate-opacity" : "modal display-none w3-animate-opacity";
        return(
            <div className={showHideClassName}>
                <section className="modal-main-comment w3-round-large">
                    <div className="w3-container w3-sand w3-round-large">
                        <h2 className="w3-text-black">소개문 제목을 수정합니다.</h2>
                    </div>
                    <div className="w3-container">
                        <br/>
                        <p>원제 : {data.context}</p>
                        <br/>
                        <form onSubmit={this.handleSubmit.bind(this)}>
                            <input className="w3-input" type="text" name="context" onChange={this.handleChange.bind(this)} placeholder={"수정할 제목 내용을 입력하세요."} value={context} />
                            <br/><br/>
                            <button type="submit" className="w3-button w3-round-large w3-green">제목 수정하기</button>
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
export default IntroEditModal;