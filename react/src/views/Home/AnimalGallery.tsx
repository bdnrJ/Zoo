import asianElephant from '../../assets/animal-gallery/asian-elephant.jpg'
import crocodile from '../../assets/animal-gallery/crocodile.jpg'
import kangaroo from '../../assets/animal-gallery/kangaroo.jpg'
import lions from '../../assets/animal-gallery/lions.jpg'
import monkey from '../../assets/animal-gallery/monkey.jpg'
import monkeys from '../../assets/animal-gallery/monkeys.jpg'
import owl from '../../assets/animal-gallery/owl.jpg'
import peacock from '../../assets/animal-gallery/peacock.jpg'
import somefish from '../../assets/animal-gallery/somefish.jpg'
import tigers from '../../assets/animal-gallery/tigers.jpg'
import turtle from '../../assets/animal-gallery/turtle.jpg'
import zebra from '../../assets/animal-gallery/zebra.jpg'


const AnimalGallery = () => {
    const images = [asianElephant, crocodile, kangaroo, lions,
        monkey, monkeys, owl, peacock, somefish, tigers, turtle, zebra]

    return (
        <div className="animalGallery">
            {images.map((image) => (
                <img src={image} alt={image} key={image} />
            ))}
        </div>
    )
}

export default AnimalGallery
