import { ColorRing } from  'react-loader-spinner'

export const Loader = () => {

    return(
        <div className="Loader">
        <ColorRing 
        visible={true}
        height="80"
        width="80"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        colors={['#00f519', '#66bf26', '#f8b26a', '#abbd81', '#849b87']}
      />
        </div>
    )
   
   
}