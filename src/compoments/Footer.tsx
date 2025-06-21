import React from 'react';

const Footer = () => {
  const footerLinks = [
    { title: '고객센터', links: ['자주 묻는 질문', '고객 지원', '계정 문의'] },
    { title: '회사', links: ['회사 소개', '채용 정보', '투자자 정보'] },
    { title: '이용약관', links: ['서비스 이용약관', '개인정보 처리방침', '쿠키 설정'] },
    { title: '소셜', links: ['페이스북', '인스타그램', '트위터'] }
  ];

  return (
    <footer className="bg-black border-t border-gray-800 mt-20">
      <div className="px-4 md:px-8 lg:px-12 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Logo and Description */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-4">EDGEFLIX</h3>
            <p className="text-gray-400 max-w-md">
              프리미엄 콘텐츠를 더 스마트하게. 
              당신의 취향에 맞는 최고의 콘텐츠를 발견하세요.
            </p>
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            {footerLinks.map((section, index) => (
              <div key={index}>
                <h4 className="font-semibold mb-4 text-white">{section.title}</h4>
                <ul className="space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a
                        href="#"
                        className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom Section */}
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-gray-400 text-sm">
                © 2024 EDGEFLIX. 모든 권리 보유.
              </div>
              <div className="flex items-center space-x-6">
                <select className="bg-gray-800 text-white border border-gray-700 rounded px-3 py-1 text-sm">
                  <option>한국어</option>
                  <option>English</option>
                </select>
                <div className="text-gray-400 text-sm">
                  대한민국
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
