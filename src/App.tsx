import { useEffect, useMemo, useState } from 'react';
import {
  Building2,
  ChevronRight,
  Gift,
  Leaf,
  Menu,
  PackageCheck,
  Ribbon,
  ScrollText,
  X,
} from 'lucide-react';

type Flavor = {
  name: string;
  shortName: string;
  mood: string;
  colorName: string;
  color: string;
  image: string;
  imageAlt: string;
  story: string;
};

const flavors: Flavor[] = [
  {
    name: 'Chuối Mè và Đậu Phộng',
    shortName: 'Mè & Đậu Phộng',
    mood: 'Nguyên bản, bùi, giòn nhẹ, thân thuộc và ấm áp.',
    colorName: 'Terracotta Red',
    color: '#A94835',
    image: '/assets/flavors/me-dau-phong.png',
    imageAlt: 'Gói kẹo chuối Mè và Đậu Phộng Bana Heritage',
    story:
      'Vị chuối truyền thống được làm dày hơn bằng mè và đậu phộng, hợp với người thích cảm giác mộc mạc, bùi thơm và dễ nhớ.',
  },
  {
    name: 'Chuối Dừa',
    shortName: 'Dừa',
    mood: 'Thơm béo, ngọt thanh, nhẹ nhàng và dễ ăn.',
    colorName: 'Ivory Cream',
    color: '#E8D8B8',
    image: '/assets/flavors/dua.png',
    imageAlt: 'Gói kẹo chuối Dừa Bana Heritage',
    story:
      'Dừa làm mềm lại vị ngọt của chuối, tạo cảm giác thanh hơn và phù hợp cho hộp quà có nhiều độ tuổi cùng thưởng thức.',
  },
  {
    name: 'Chuối Mít',
    shortName: 'Mít',
    mood: 'Hương trái cây nhiệt đới rõ nét, ngọt đậm và dai dẻo.',
    colorName: 'Warm Amber',
    color: '#C9762A',
    image: '/assets/flavors/mit.png',
    imageAlt: 'Gói kẹo chuối Mít Bana Heritage',
    story:
      'Mít đưa hương trái cây Việt Nam lên phía trước, tạo một lớp mùi thơm rực rỡ nhưng vẫn giữ nền chuối sứ quen thuộc.',
  },
  {
    name: 'Chuối Tắc',
    shortName: 'Tắc',
    mood: 'Chua thanh, the mát, giúp cân bằng vị ngọt.',
    colorName: 'Sage Green',
    color: '#78946B',
    image: '/assets/flavors/tac.png',
    imageAlt: 'Gói kẹo chuối Tắc Bana Heritage',
    story:
      'Vị tắc giúp món kẹo có nhịp sáng hơn, hợp với người muốn một dư vị gọn, thanh và không quá ngọt.',
  },
  {
    name: 'Chuối Sầu Riêng',
    shortName: 'Sầu Riêng',
    mood: 'Thơm đậm, giàu năng lượng và nổi bật.',
    colorName: 'Imperial Yellow',
    color: '#D6A12E',
    image: '/assets/flavors/sau-rieng.png',
    imageAlt: 'Gói kẹo chuối Sầu Riêng Bana Heritage',
    story:
      'Sầu riêng tạo phiên bản cá tính nhất trong bộ sưu tập, dành cho người thích hương vị đậm và dấu ấn nhiệt đới rõ ràng.',
  },
  {
    name: 'Chuối Chanh Dây',
    shortName: 'Chanh Dây',
    mood: 'Chua ngọt, tươi mát, trẻ trung và hiện đại.',
    colorName: 'Plum Purple',
    color: '#76516F',
    image: '/assets/flavors/chanh-day.png',
    imageAlt: 'Gói kẹo chuối Chanh Dây Bana Heritage',
    story:
      'Chanh dây mang lại độ chua ngọt tươi hơn, giúp kẹo chuối trở nên mới mẻ với nhóm khách trẻ và khách muốn thử vị khác lạ.',
  },
];

const navItems = [
  { label: 'Câu chuyện', target: 'story' },
  { label: 'Bộ sưu tập', target: 'flavors' },
  { label: 'Hộp quà', target: 'formats' },
  { label: 'Giá trị', target: 'values' },
  { label: 'Doanh nghiệp', target: 'business' },
];

const values = [
  {
    icon: Leaf,
    title: 'Nông sản Việt Nam',
    copy: 'Chuối sứ phơi nắng kết hợp đường thốt nốt và nguyên liệu nhiệt đới đặc trưng.',
  },
  {
    icon: ScrollText,
    title: 'Vị ngọt thanh',
    copy: 'Hướng đến cảm giác dễ ăn, không nặng vị, phù hợp để thưởng thức và biếu tặng.',
  },
  {
    icon: Gift,
    title: 'Sáu trải nghiệm',
    copy: 'Từ vị bùi nguyên bản đến chua ngọt hiện đại, mỗi hương vị có màu nhận diện riêng.',
  },
  {
    icon: PackageCheck,
    title: 'Đóng gói chỉn chu',
    copy: 'Từng viên được bọc màng thực phẩm và ép nhiệt kín hai đầu nhằm hạn chế dính rít.',
  },
];

const assetPaths = {
  logo: '/assets/bana-heritage-logo.jpeg',
  schoolLogo: '/assets/school-logo.png',
  sixFlavors: '/assets/bana-heritage-six-flavors.png',
  giftBox: '/assets/bana-heritage-gift-box.png',
};

function scrollToSection(target: string) {
  document.getElementById(target)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export default function App() {
  const [activeFlavor, setActiveFlavor] = useState(flavors[0]);
  const [menuOpen, setMenuOpen] = useState(false);

  const activeIndex = useMemo(
    () => flavors.findIndex((flavor) => flavor.name === activeFlavor.name) + 1,
    [activeFlavor],
  );

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  useEffect(() => {
    const motionReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (motionReduced) {
      document.querySelectorAll('.reveal').forEach((node) => node.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 },
    );

    document.querySelectorAll('.reveal').forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  const handleNavClick = (target: string) => {
    scrollToSection(target);
    setMenuOpen(false);
  };

  return (
    <div className="site-shell">
      <header className="site-header">
        <a className="brand-lockup" href="#top" aria-label="Bana Heritage về đầu trang">
          <img src={assetPaths.logo} alt="" className="brand-logo" />
          <span>
            <strong>Bana Heritage</strong>
            <small>Kế thừa vị cổ</small>
          </span>
        </a>

        <nav className={menuOpen ? 'main-nav is-open' : 'main-nav'} aria-label="Điều hướng chính">
          {navItems.map((item) => (
            <button key={item.target} type="button" onClick={() => handleNavClick(item.target)}>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="header-actions">
          <button className="text-link" type="button" onClick={() => handleNavClick('flavors')}>
            Khám phá bộ sưu tập
            <ChevronRight size={18} aria-hidden="true" />
          </button>
          <button
            className="menu-toggle"
            type="button"
            aria-label={menuOpen ? 'Đóng menu' : 'Mở menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          </button>
        </div>
      </header>

      <main id="top">
        <section className="hero-section" aria-labelledby="hero-title">
          <div className="hero-media" aria-hidden="true">
            <img
              src={assetPaths.giftBox}
              alt=""
              className="hero-image"
              width="1200"
              height="900"
              fetchPriority="high"
            />
          </div>
          <div className="container hero-content">
            <p className="eyebrow">Kẹo chuối đặc sản cao cấp</p>
            <h1 id="hero-title">Bana Heritage</h1>
            <p className="hero-slogan">Kế thừa vị cổ, khởi tạo tinh hoa</p>
            <p className="hero-copy">
              Từ chuối sứ phơi nắng, đường thốt nốt và những hương vị nhiệt đới, Bana Heritage
              làm mới món kẹo chuối truyền thống thành một trải nghiệm quà tặng chỉn chu, gần gũi
              và hiện đại.
            </p>
            <div className="hero-actions" aria-label="Lối tắt nội dung">
              <button className="primary-button" type="button" onClick={() => handleNavClick('flavors')}>
                Khám phá 6 hương vị
                <ChevronRight size={19} aria-hidden="true" />
              </button>
              <button className="secondary-button" type="button" onClick={() => handleNavClick('formats')}>
                Xem hộp quà Lục vị
              </button>
            </div>
          </div>
        </section>

        <section className="story-strip reveal" aria-label="Tổng quan sản phẩm">
          <div className="container story-strip-grid">
            <span>6 hương vị</span>
            <span>Hộp bán lẻ 200 g</span>
            <span>Bộ sưu tập Lục vị 720 g</span>
            <span>Quà tặng doanh nghiệp</span>
          </div>
        </section>

        <section className="section story-section" id="story" aria-labelledby="story-title">
          <div className="container two-column">
            <div className="section-copy reveal">
              <p className="eyebrow">Câu chuyện thương hiệu</p>
              <h2 id="story-title">Giữ vị chuối xưa trong một hình hài quà tặng mới</h2>
              <p>
                “Bana” gợi nhắc đến chuối, còn “Heritage” là di sản. Tinh thần của thương hiệu là
                kế thừa món kẹo chuối quen thuộc, rồi làm mới bằng hương vị, cách đóng gói và cảm
                giác mở quà trang trọng hơn.
              </p>
              <p>
                Thiết kế của Bana Heritage hướng đến nhóm khách mua đặc sản làm quà, khách du lịch,
                người trẻ muốn thử hương vị mới và doanh nghiệp cần quà tặng đối tác có câu chuyện
                Việt Nam rõ ràng.
              </p>
            </div>
            <div className="story-mark reveal" aria-label="Logo Bana Heritage">
              <img src={assetPaths.logo} alt="Logo Bana Heritage Việt Nam" loading="lazy" />
              <p>Công Ty TNHH Bana Heritage Việt Nam</p>
            </div>
          </div>
        </section>

        <section className="section product-showcase reveal" aria-labelledby="collection-title">
          <div className="container showcase-grid">
            <div>
              <p className="eyebrow">Bộ sưu tập chính</p>
              <h2 id="collection-title">Một hộp quà mở ra sáu sắc thái nhiệt đới</h2>
              <p>
                Bộ sáu hộp bán lẻ dùng màu nhận diện riêng cho từng vị, giúp người nhận dễ chọn,
                dễ nhớ và có cảm giác đang khám phá một bộ sưu tập hoàn chỉnh.
              </p>
            </div>
            <figure className="product-figure">
              <img
                src={assetPaths.sixFlavors}
                alt="Bộ 6 hộp kẹo chuối Bana Heritage với các hương vị khác nhau"
                loading="lazy"
              />
              <figcaption>Bộ hộp bán lẻ: mỗi hộp một hương vị, khối lượng tịnh 200 g.</figcaption>
            </figure>
          </div>
        </section>

        <section className="section flavors-section" id="flavors" aria-labelledby="flavors-title">
          <div className="container">
            <div className="section-heading reveal">
              <p className="eyebrow">Bộ sưu tập 6 hương vị</p>
              <h2 id="flavors-title">Chọn một vị để xem câu chuyện riêng</h2>
              <p>
                Mỗi hương vị giữ nền chuối sứ nhưng đổi sắc thái bằng một nguyên liệu nhiệt đới
                quen thuộc, từ bùi ấm đến chua ngọt tươi mát.
              </p>
            </div>

            <div className="flavor-layout">
              <div className="flavor-grid reveal" role="list" aria-label="Danh sách hương vị">
                {flavors.map((flavor) => {
                  const isActive = flavor.name === activeFlavor.name;
                  return (
                    <button
                      type="button"
                      className={isActive ? 'flavor-card is-active' : 'flavor-card'}
                      key={flavor.name}
                      onClick={() => setActiveFlavor(flavor)}
                      aria-pressed={isActive}
                      style={{ '--flavor-color': flavor.color } as React.CSSProperties}
                    >
                      <span className="flavor-visual" aria-hidden="true">
                        <span className="flavor-swatch" />
                        <img className="flavor-pack" src={flavor.image} alt="" loading="lazy" />
                      </span>
                      <span className="flavor-name">{flavor.name}</span>
                      <span className="flavor-mood">{flavor.mood}</span>
                      <span className="flavor-color-name">{flavor.colorName}</span>
                    </button>
                  );
                })}
              </div>

              <aside className="flavor-panel reveal" aria-live="polite">
                <div className="panel-image-wrap">
                  <img src={activeFlavor.image} alt={activeFlavor.imageAlt} loading="lazy" />
                </div>
                <span className="panel-index">Vị {activeIndex}/6</span>
                <h3>{activeFlavor.shortName}</h3>
                <p>{activeFlavor.story}</p>
                <div className="panel-color-row">
                  <span
                    className="large-swatch"
                    style={{ backgroundColor: activeFlavor.color }}
                    aria-hidden="true"
                  />
                  <span>{activeFlavor.colorName}</span>
                </div>
              </aside>
            </div>
          </div>
        </section>

        <section className="section values-section" id="values" aria-labelledby="values-title">
          <div className="container">
            <div className="section-heading reveal">
              <p className="eyebrow">Giá trị sản phẩm</p>
              <h2 id="values-title">Chỉn chu từ nguyên liệu đến từng viên kẹo</h2>
            </div>
            <div className="values-grid">
              {values.map((item) => {
                const Icon = item.icon;
                return (
                  <article className="value-card reveal" key={item.title}>
                    <Icon size={25} strokeWidth={1.8} aria-hidden="true" />
                    <h3>{item.title}</h3>
                    <p>{item.copy}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="section formats-section" id="formats" aria-labelledby="formats-title">
          <div className="container">
            <div className="section-heading reveal">
              <p className="eyebrow">Hai quy cách quà tặng</p>
              <h2 id="formats-title">Linh hoạt cho thử vị, biếu tặng và trưng bày</h2>
            </div>

            <div className="format-grid">
              <article className="format-card reveal">
                <div>
                  <p className="format-kicker">Hộp bán lẻ</p>
                  <h3>Mỗi hộp một hương vị</h3>
                  <p>
                    Hộp giấy nắp gài có logo, tên vị, minh họa nguyên liệu dạng line art và mã QR
                    “Khám phá di sản”.
                  </p>
                </div>
                <dl>
                  <div>
                    <dt>Khối lượng</dt>
                    <dd>200 g</dd>
                  </div>
                  <div>
                    <dt>Giá đề xuất</dt>
                    <dd>69.000 đồng</dd>
                  </div>
                </dl>
              </article>

              <article className="format-card featured-format reveal">
                <img
                  src={assetPaths.giftBox}
                  alt="Hộp quà Bộ sưu tập Lục vị Bana Heritage"
                  loading="lazy"
                />
                <div>
                  <p className="format-kicker">Bộ sưu tập Lục vị</p>
                  <h3>Hộp quà mở hai cánh</h3>
                  <p>
                    Hộp cứng bồi giấy mỹ thuật, nam châm chìm và 6 ngăn cho 6 hương vị. Phù hợp
                    làm quà tặng đặc sản hoặc quà đối tác.
                  </p>
                  <dl>
                    <div>
                      <dt>Khối lượng</dt>
                      <dd>720 g gồm 6 hộp nhỏ 120 g</dd>
                    </div>
                    <div>
                      <dt>Giá đề xuất</dt>
                      <dd>249.000 đồng</dd>
                    </div>
                  </dl>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="section business-section" id="business" aria-labelledby="business-title">
          <div className="container business-band reveal">
            <div>
              <p className="eyebrow">Quà tặng doanh nghiệp</p>
              <h2 id="business-title">Một hộp quà có thể mang dấu ấn riêng của từng dịp tặng</h2>
              <p>
                Bana Heritage có thể giới thiệu hướng cá nhân hóa bao bì, logo ép kim trên dải ruy
                băng hoặc chi tiết phù hợp, mã QR và cơ cấu hương vị theo dịp tặng.
              </p>
            </div>
            <button className="primary-button dark" type="button" onClick={() => handleNavClick('contact')}>
              Xem thông tin thương hiệu
              <ChevronRight size={19} aria-hidden="true" />
            </button>
          </div>
        </section>
      </main>

      <footer className="site-footer" id="contact">
        <div className="container footer-grid">
          <div>
            <img src={assetPaths.logo} alt="" className="footer-logo" />
            <h2>Bana Heritage</h2>
            <p>Kế thừa vị cổ, khởi tạo tinh hoa.</p>
          </div>
          <address>
            <Building2 size={22} aria-hidden="true" />
            <span>
              <strong>Công Ty TNHH Bana Heritage Việt Nam</strong>
              <span>248 Thoại Ngọc Hầu, phường Hòa Thạnh, quận Tân Phú, TP.HCM</span>
              <a className="footer-phone" href="tel:0792055062">
                0792 055 062
              </a>
            </span>
          </address>
          <div className="footer-links" aria-label="Liên kết nội bộ">
            {navItems.map((item) => (
              <button key={item.target} type="button" onClick={() => handleNavClick(item.target)}>
                {item.label}
              </button>
            ))}
          </div>
        </div>
        <div className="container footer-academic" aria-label="Thông tin nhóm thực hiện đề tài">
          <img
            src={assetPaths.logo}
            alt="Logo Bana Heritage"
            className="footer-academic-logo"
            loading="lazy"
          />
          <div className="footer-academic-copy">
            <strong>Nhóm sinh viên Trường Đại học Công Thương TP.HCM</strong>
            <span>Đề tài: Lập kế hoạch kinh doanh</span>
          </div>
          <img
            src={assetPaths.schoolLogo}
            alt="Logo Trường Đại học Công Thương TP.HCM"
            className="footer-academic-logo footer-academic-logo-school"
            loading="lazy"
          />
        </div>
      </footer>
    </div>
  );
}
