import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Navbar from '../../Components/Navbar';
import Footer from '../../Components/Footer';
import '../../Styles/NewGallery.css';  


const GalleryContainer = styled.div`
  max-width: 1750px;
  margin: 0 auto;
  padding: 20px;
`;

const GallerySection = styled.div`
  margin-bottom: 40px;
  text-align: center;
`;

const SectionTitle = styled.h3`
  font-size: 3  4px;
  margin-bottom: 10px;
`;

const SectionTheme = styled.h4`
  font-size: 18px;
  margin-bottom: 10px;
`;

const SectionDescription = styled.p`
  font-size: 16px;
  margin-bottom: 20px;
`;

const GalleryGrid = styled.div`
  display: grid;
  ${'' /* grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); */}
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
`;

const GalleryItem = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    transition: transform 0.3s ease;
    &:active {
      transform: scale(0.98);
    }
  }
`;

const GalleryImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const PreviewOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const PreviewBox = styled.div`
  position: relative;
  max-width: 90%;
  max-height: 90%;
`;

const PreviewContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PreviewImage = styled.img`
  max-width: 100%;
  max-height: 80vh;
  object-fit: contain;
`;

const PreviewInfo = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 10px;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 18px;
  cursor: pointer;
`;

const NavButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  font-size: 24px;
  padding: 10px;
  cursor: pointer;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;



const TlbcGallery = () => {
  const [previewVisible, setPreviewVisible] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [allImages, setAllImages] = useState([]);

  // Dynamically import all images in the 'images' directory
  useEffect(() => {
    const importAllImages = async () => {
      const images = {};
      for (let i = 1; i <= 48; i++) {
        images[`../../assets/imagess/image${i}.jpg`] = () => import(`../../assets/imagess/image${i}.jpg`);
      }
      const imagePaths = await Promise.all(
        Object.keys(images).map(async (key) => {
          const module = await images[key]();
          return module.default;
        })
      );
      setAllImages(imagePaths);
    };

    importAllImages();
  }, []);

  // Mapping images to their respective sections
  const sections = [
    {
      title: "TLBC 2023",
      theme: "Immortality",
      description: "The Convocation held at Faithful Camp Uke, Anambra State and it recorded great success.\nWe received teachings on IMMORTALITY and we were blessed.",
      startIndex: 42,
      endIndex: 48,
    },
    {
      title: "TLBC 2022",
      theme: "The City of God",
      description: "Reverend Elochukwu Udegbunam took us on the subject called The City of God and we were blessed. \nThe Convocation recorded great success. Glory to God..",
      startIndex: 36,
      endIndex: 42,
    },
    {
      title: "TLBC 2021",
      theme: "The Promise",
      description: "The Convocation held in Awka, Anambra State and it was a turning point in the lives of many. \nReverend Elochukwu Udegbunam took us on the subject The Promise and we were blessed. Glory to God.",
      startIndex: 30,
      endIndex: 36,
    },
    {
      title: "TLBC 2020",
      theme: "The Two Men called the Sons of God",
      description: "Reverend Elochukwu Udegbunam took us on the subject The Two Men called the Sons of God. \nThe meeting educated and blessed us greatly. Glory to God.",
      startIndex: 24,
      endIndex: 30,
    },
    {
      title: "TLBC 2019",
      theme: "ACTS",
      description: "Reverend Elochukwu Udegbunam took us on the subject titled ACTS, and he taught us from the scriptures, \nthe response of the first generation of the Apostles of Jesus. The meeting left us inspired and we were blessed. Glory to God.",
      startIndex: 18,
      endIndex: 24,
    },
    {
      title: "TLBC 2018",
      theme: "The Kingdom, The Power and The Glory",
      description: "The Convocation took place in Awka and Reverend Elochukwu Udegbunam took us on the subject The Kingdom, The Power and The Glory. \nIt was a glorious moment with the word in TLBC'18 and we were educated and blessed. Glory to God.",
      startIndex: 12,
      endIndex: 18,
    },
    {
      title: "TLBC 2017",
      theme: "The Great Commission",
      description: "It was a great and rich experience we had in TLBC'17. We call it The Lord's Brethren Experience. \nReverend Elochukwu Udegbunam took us on the subject The Great Commission and we were educated, inspired and blessed. Glory to God.",
      startIndex: 6,
      endIndex: 12,
    },
    {
      title: "TLBC 2016",
      theme: "Presenting the Glorious Church",
      description: "TLBC'16 was a memorable one for us and will always be remembered in our journey as a Ministry. \nIt was the beginning of our Church Ministry and our first Convocation. Reverend Elochukwu Udegbunam took us on the subject Presenting the Glorious Church and we were blessed. Glory to God.",
      startIndex: 0,
      endIndex: 6,
    },
  ];

  const openPreview = (sectionIndex, imageIndex) => {
    if (window.innerWidth > 768) {
      setCurrentSection(sectionIndex);
      setCurrentImageIndex(imageIndex);
      setPreviewVisible(true);
      document.body.style.overflow = 'hidden';
    }
  };

  const closePreview = () => {
    setPreviewVisible(false);
    document.body.style.overflow = 'scroll';
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex < sections[currentSection].endIndex - sections[currentSection].startIndex - 1
        ? prevIndex + 1
        : prevIndex
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : prevIndex
    );
  };

  
    return (
        <>
        <Navbar />

      <GalleryContainer className="image-gallery">
        {sections.map((section, sectionIndex) => (
          <GallerySection key={sectionIndex} className="gallery-section">
            <SectionTitle>{section.title}</SectionTitle>
            <SectionTheme>Theme: <span className="text-danger">{section.theme}</span></SectionTheme>
            <SectionDescription style={{ whiteSpace: 'pre-line' }}>{section.description}</SectionDescription>
            <GalleryGrid className="gallery-grid">
              {allImages.slice(section.startIndex, section.endIndex).map((image, imageIndex) => (
                <GalleryItem key={imageIndex} className="gallery-item" onClick={() => openPreview(sectionIndex, imageIndex)}>
                  <GalleryImage src={image} alt={`${section.title} Image ${imageIndex + 1}`} />
                </GalleryItem>
              ))}
            </GalleryGrid>
          </GallerySection>
        ))}
  
        {previewVisible && (
          <div className="preview-overlay" onClick={closePreview}>
            <div className="preview-box" onClick={(e) => e.stopPropagation()}>
              <div className="preview-content">
                <img src={allImages[sections[currentSection].startIndex + currentImageIndex]}
                     alt={`${sections[currentSection].title} Image ${currentImageIndex + 1}`} />
                <div className="preview-info">
                  <span>Image {currentImageIndex + 1} of {sections[currentSection].endIndex - sections[currentSection].startIndex}</span>
                  <button className="close-btn" onClick={closePreview}>X Close</button>
                </div>
                <button className="nav-btn prev" onClick={prevImage} disabled={currentImageIndex === 0}>&lt;</button>
                <button className="nav-btn next" onClick={nextImage} disabled={currentImageIndex === sections[currentSection].endIndex - sections[currentSection].startIndex - 1}>&gt;</button>
              </div>
            </div>
          </div>
        )}
      </GalleryContainer>
        <Footer />
      </>
    );
  };

export default TlbcGallery;


























// import React from 'react'
// import Navbar from '../../Components/Navbar'
// import Footer from '../../Components/Footer'
// import '../../Styles/Gallery.css'


// function Gallery() {

//     return (
//         <>
//             <Navbar />

//             <section class="hero-section" id="section_1">
//                 <div class="container d-flex justify-content-center align-items-center">
//                     <div class="">
//                         <div class="col-12 mt-4 mb-5 text-center">
//                             <h2 class="text-white mb-1" id="annual">Snippet of Past TLBC's</h2>
//                         </div>
//                     </div>
//                 </div>
//             </section>

//             <section class="2023">
//                 <div class="wrapper">
//                     <div class="container all-pictures">
//                         <h3>TLBC'23</h3>
//                         <h4>Theme: <span class="text-danger">Immortality</span></h4>
//                         <div class="gallery">
//                             <div class="image"><span><img src="/imagess/image43.jpg" alt=""/></span></div>
//                             <div class="image"><span><img src="/imagess/image44.jpg" alt=""/></span></div>
//                             <div class="image"><span><img src="/imagess/image45.jpg" alt=""/></span></div>
//                             <div class="image"><span><img src="/imagess/image46.jpg" alt=""/></span>
//                             </div>
//                             <div class="image"><span><img src="/imagess/image47.jpg" alt=""/></span></div>
//                             <div class="image"><span><img src="/imagess/image48.jpg" alt=""/></span></div>
//                         </div>
//                     </div>
//                     <div class="preview-box">
//                         <div class="details">
//                             <span class="title">Image <p class="current-img"></p> of <p class="total-img"></p></span>
//                             <span class="icon fas fa-times"></span>
//                         </div>
//                         <div class="image-box">
//                             <div class="slide prev"><i class="fas fa-angle-left"></i></div>
//                             <div class="slide next"><i class="fas fa-angle-right"></i></div>
//                             <img src="" alt="" />
//                         </div>
//                     </div>
//                     <div class="shadow"></div>
//                 </div>
//             </section>


//             <section class="2023">
//                 <div class="wrapper">
//                     <div class="container all-pictures">
//                         <h3>TLBC'22</h3>
//                         <h4>Theme: <span class="text-danger">Immortality</span></h4>
//                         <div class="gallery">
//                             <div class="image"><span><img src="/imagess/image37.jpg" alt=""/></span></div>
//                             <div class="image"><span><img src="/imagess/image38.jpg" alt=""/></span></div>
//                             <div class="image"><span><img src="/imagess/image39.jpg" alt=""/></span></div>
//                             <div class="image"><span><img src="/imagess/image40.jpg" alt=""/></span>
//                             </div>
//                             <div class="image"><span><img src="/imagess/image41.jpg" alt=""/></span></div>
//                             <div class="image"><span><img src="/imagess/image42.jpg" alt=""/></span></div>
//                         </div>
//                     </div>
//                     <div class="preview-box">
//                         <div class="details">
//                             <span class="title">Image <p class="current-img"></p> of <p class="total-img"></p></span>
//                             <span class="icon fas fa-times"></span>
//                         </div>
//                         <div class="image-box">
//                             <div class="slide prev"><i class="fas fa-angle-left"></i></div>
//                             <div class="slide next"><i class="fas fa-angle-right"></i></div>
//                             <img src="" alt="" />
//                         </div>
//                     </div>
//                     <div class="shadow"></div>
//                 </div>
//             </section>



//             <section class="2023">
//                 <div class="wrapper">
//                     <div class="container all-pictures">
//                         <h3>TLBC'21</h3>
//                         <h4>Theme: <span class="text-danger">Immortality</span></h4>
//                         <div class="gallery">
//                             <div class="image"><span><img src="/imagess/image31.jpg" alt=""/></span></div>
//                             <div class="image"><span><img src="/imagess/image32.jpg" alt=""/></span></div>
//                             <div class="image"><span><img src="/imagess/image33.jpg" alt=""/></span></div>
//                             <div class="image"><span><img src="/imagess/image34.jpg" alt=""/></span>
//                             </div>
//                             <div class="image"><span><img src="/imagess/image35.jpg" alt=""/></span></div>
//                             <div class="image"><span><img src="/imagess/image36.jpg" alt=""/></span></div>
//                         </div>
//                     </div>
//                     <div class="preview-box">
//                         <div class="details">
//                             <span class="title">Image <p class="current-img"></p> of <p class="total-img"></p></span>
//                             <span class="icon fas fa-times"></span>
//                         </div>
//                         <div class="image-box">
//                             <div class="slide prev"><i class="fas fa-angle-left"></i></div>
//                             <div class="slide next"><i class="fas fa-angle-right"></i></div>
//                             <img src="" alt="" />
//                         </div>
//                     </div>
//                     <div class="shadow"></div>
//                 </div>
//             </section>



//             <section class="2023">
//                 <div class="wrapper">
//                     <div class="container all-pictures">
//                         <h3>TLBC'20</h3>
//                         <h4>Theme: <span class="text-danger">Immortality</span></h4>
//                         <div class="gallery">
//                             <div class="image"><span><img src="/imagess/image25.jpg" alt=""/></span></div>
//                             <div class="image"><span><img src="/imagess/image26.jpg" alt=""/></span></div>
//                             <div class="image"><span><img src="/imagess/image27.jpg" alt=""/></span></div>
//                             <div class="image"><span><img src="/imagess/image28.jpg" alt=""/></span>
//                             </div>
//                             <div class="image"><span><img src="/imagess/image29.jpg" alt=""/></span></div>
//                             <div class="image"><span><img src="/imagess/image30.jpg" alt=""/></span></div>
//                         </div>
//                     </div>
//                     <div class="preview-box">
//                         <div class="details">
//                             <span class="title">Image <p class="current-img"></p> of <p class="total-img"></p></span>
//                             <span class="icon fas fa-times"></span>
//                         </div>
//                         <div class="image-box">
//                             <div class="slide prev"><i class="fas fa-angle-left"></i></div>
//                             <div class="slide next"><i class="fas fa-angle-right"></i></div>
//                             <img src="" alt="" />
//                         </div>
//                     </div>
//                     <div class="shadow"></div>
//                 </div>
//             </section>



//             <section class="2023">
//                 <div class="wrapper">
//                     <div class="container all-pictures">
//                         <h3>TLBC'19</h3>
//                         <h4>Theme: <span class="text-danger">Immortality</span></h4>
//                         <div class="gallery">
//                             <div class="image"><span><img src="/imagess/image19.jpg" alt=""/></span></div>
//                             <div class="image"><span><img src="/imagess/image20.jpg" alt=""/></span></div>
//                             <div class="image"><span><img src="/imagess/image21.jpg" alt=""/></span></div>
//                             <div class="image"><span><img src="/imagess/image22.jpg" alt=""/></span>
//                             </div>
//                             <div class="image"><span><img src="/imagess/image23.jpg" alt=""/></span></div>
//                             <div class="image"><span><img src="/imagess/image24.jpg" alt=""/></span></div>
//                         </div>
//                     </div>
//                     <div class="preview-box">
//                         <div class="details">
//                             <span class="title">Image <p class="current-img"></p> of <p class="total-img"></p></span>
//                             <span class="icon fas fa-times"></span>
//                         </div>
//                         <div class="image-box">
//                             <div class="slide prev"><i class="fas fa-angle-left"></i></div>
//                             <div class="slide next"><i class="fas fa-angle-right"></i></div>
//                             <img src="" alt="" />
//                         </div>
//                     </div>
//                     <div class="shadow"></div>
//                 </div>
//             </section>



//             <section class="2023">
//                 <div class="wrapper">
//                     <div class="container all-pictures">
//                         <h3>TLBC'18</h3>
//                         <h4>Theme: <span class="text-danger">Immortality</span></h4>
//                         <div class="gallery">
//                             <div class="image"><span><img src="/imagess/image13.jpg" alt=""/></span></div>
//                             <div class="image"><span><img src="/imagess/image14.jpg" alt=""/></span></div>
//                             <div class="image"><span><img src="/imagess/image15.jpg" alt=""/></span></div>
//                             <div class="image"><span><img src="/imagess/image16.jpg" alt=""/></span>
//                             </div>
//                             <div class="image"><span><img src="/imagess/image17.jpg" alt=""/></span></div>
//                             <div class="image"><span><img src="/imagess/image18.jpg" alt=""/></span></div>
//                         </div>
//                     </div>
//                     <div class="preview-box">
//                         <div class="details">
//                             <span class="title">Image <p class="current-img"></p> of <p class="total-img"></p></span>
//                             <span class="icon fas fa-times"></span>
//                         </div>
//                         <div class="image-box">
//                             <div class="slide prev"><i class="fas fa-angle-left"></i></div>
//                             <div class="slide next"><i class="fas fa-angle-right"></i></div>
//                             <img src="" alt="" />
//                         </div>
//                     </div>
//                     <div class="shadow"></div>
//                 </div>
//             </section>



//             <section class="2023">
//                 <div class="wrapper">
//                     <div class="container all-pictures">
//                         <h3>TLBC'17</h3>
//                         <h4>Theme: <span class="text-danger">Immortality</span></h4>
//                         <div class="gallery">
//                             <div class="image"><span><img src="/imagess/image7.jpg" alt=""/></span></div>
//                             <div class="image"><span><img src="/imagess/image8.jpg" alt=""/></span></div>
//                             <div class="image"><span><img src="/imagess/image9.jpg" alt=""/></span></div>
//                             <div class="image"><span><img src="/imagess/image10.jpg" alt=""/></span>
//                             </div>
//                             <div class="image"><span><img src="/imagess/image11.jpg" alt=""/></span></div>
//                             <div class="image"><span><img src="/imagess/image12.jpg" alt=""/></span></div>
//                         </div>
//                     </div>
//                     <div class="preview-box">
//                         <div class="details">
//                             <span class="title">Image <p class="current-img"></p> of <p class="total-img"></p></span>
//                             <span class="icon fas fa-times"></span>
//                         </div>
//                         <div class="image-box">
//                             <div class="slide prev"><i class="fas fa-angle-left"></i></div>
//                             <div class="slide next"><i class="fas fa-angle-right"></i></div>
//                             <img src="" alt="" />
//                         </div>
//                     </div>
//                     <div class="shadow"></div>
//                 </div>
//             </section>



//             <section class="year-one">
//                 <div class="wrapper">
//                     <div class="container all-pictures">
//                         <h3>TLBC'16</h3>
//                         <h4>Theme: <span class="text-danger">Immortality</span></h4>
//                         <div class="gallery">
//                             <div class="image"><span><img src="/imagess/image1.jpg" alt=""/></span></div>
//                             <div class="image"><span><img src="/imagess/image2.jpg" alt=""/></span></div>
//                             <div class="image"><span><img src="/imagess/image3.jpg" alt=""/></span></div>
//                             <div class="image"><span><img src="/imagess/image4.jpg" alt=""/></span>
//                             </div>
//                             <div class="image"><span><img src="/imagess/image5.jpg" alt=""/></span></div>
//                             <div class="image"><span><img src="/imagess/image6.jpg" alt=""/></span></div>
//                         </div>
//                     </div>
//                     <div class="preview-box">
//                         <div class="details">
//                             <span class="title">Image <p class="current-img"></p> of <p class="total-img"></p></span>
//                             <span class="icon fas fa-times"></span>
//                         </div>
//                         <div class="image-box">
//                             <div class="slide prev"><i class="fas fa-angle-left"></i></div>
//                             <div class="slide next"><i class="fas fa-angle-right"></i></div>
//                             <img src="" alt="" />
//                         </div>
//                     </div>
//                     <div class="shadow"></div>
//                 '</div>'
//             </section>

//             <Footer />
//         </>
//     )
// }

// export default Gallery