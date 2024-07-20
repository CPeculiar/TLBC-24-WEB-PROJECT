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


const Gallery = () => {
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

export default Gallery;