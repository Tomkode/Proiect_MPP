import {styled} from 'styled-components'

const CenteredContainer = styled.div`
    width: 50vw;
    margin-left: auto;
    margin-right: auto;
    height: 100vh;
    :nth-child(n){
        margin-bottom: 15px;
        margin-top: 15px;
        margin-left: auto;
        margin-right: auto;
    }
`

export default CenteredContainer;