import React from 'react';
import Gallery from 'react-photo-gallery';
import Lightbox from 'react-images';
export default class Box extends React.Component {
    constructor(props){
        super(props);
        this.state={
            lightboxIsOpen:false
        }
    }
    openLightbox=(index, event)=>{
        event.preventDefault();
        this.setState({
            currentImage: index,
            lightboxIsOpen: true
        });
    }
    closeLightbox=()=>{
        this.setState({
            currentImage: 0,
            lightboxIsOpen: false,
        });
    }
    gotoPrevious=()=>{
        this.setState({
            currentImage: this.state.currentImage - 1,
        });
    }
    gotoNext=()=>{
        this.setState({
            currentImage: this.state.currentImage + 1,
        });
    }
    onClickThumbnail=(index)=>{
        this.setState({
            currentImage: index,
        });
    }
    render() {
        const {images=[],cols=4}=this.props;
        let PHOTO_SET=[];
        images.map((item)=>{
            PHOTO_SET.push({
                src: item.url,
                caption: item.title,
                width: 100,
                height: 100
            })
        });
        return (
            <div>
                <Gallery photos={PHOTO_SET} cols={cols} onClickPhoto={this.openLightbox} />
                <Lightbox
                    images={PHOTO_SET}
                    backdropClosesModal={true}
                    onClose={this.closeLightbox}
                    onClickPrev={this.gotoPrevious}
                    onClickNext={this.gotoNext}
                    currentImage={this.state.currentImage}
                    isOpen={this.state.lightboxIsOpen}
                    width={1024}
                    showThumbnails
                    onClickThumbnail={this.onClickThumbnail}
                    showCloseButton={false}
                    imageCountSeparator=" / "
                />
            </div>
        );
    }
}
