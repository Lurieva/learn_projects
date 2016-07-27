class HomeController {
    constructor() {
        this.name = 'home';
        this.slideIndex = 1;

        this.slides = [
            {'image': 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTG6kAqaoNziHJnsOoL_o8mO9qeFuOaNPpAaX7itCNFKhqa6ns_Wg',
              'alt': 'Img1'
            },
            {'image': 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQs-B_upyjE_7nnmg9U2etV1iz-80VPWgdtduWI6xP4s8TCTlPq',
              'alt': 'Img2'
            },
            {'image': 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTSgn0ioHQxhtoJX8aaUrCw33VPbmd8Eb2vF4IioN9ezd5PeUfFVg',
              'alt': 'Img3'
            }
        ];
        this.next = function() {
            var total = this.slides.length;
            if (total > 0) {
                this.slideIndex = (this.slideIndex == total - 1) ? 0 : this.slideIndex + 1;
            }
        };
        this.prev = function () {
            var total = this.slides.length;
            if (total > 0) {
                this.slideIndex = (this.slideIndex == 0) ? total - 1 : this.slideIndex - 1;
            }
        };
        this.play = function() {
            var timeOut = $timeout(function() {
                this.next();
                this.play();
            }, 2000);
        };
    }
}

export default HomeController;