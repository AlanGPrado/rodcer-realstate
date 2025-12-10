'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { getAgentById } from '../../lib/agentData';
import { getPropertiesByAgentId, getRecentProperties } from '../../lib/propertyData';
import { useTranslation } from '../../lib/i18n/useTranslation';

export default function AgentDetail() {
    const { t } = useTranslation();
    const params = useParams();
    const id = parseInt(params.id as string);
    const agent = getAgentById(id);
    const agentProperties = getPropertiesByAgentId(id);
    const recentProperties = getRecentProperties(undefined, 3);

    if (!agent) {
        return (
            <div className="min-h-screen flex flex-col">
                <Header />
                <div className="flex-grow flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-primary-green mb-4">{t('agentDetail.notFound')}</h1>
                        <Link href="/" className="text-accent-green hover:underline">
                            {t('agentDetail.returnHome')}
                        </Link>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Header />

            {/* Page Header */}
            <div className="relative h-[40vh] w-full shimmer-effect">
                <Image
                    src="/hero-bg.jpg"
                    alt="Propiedades"
                    fill
                    className="object-cover"
                    priority
                    onLoad={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.parentElement?.classList.add('loaded');
                    }}
                />
                <div className="absolute inset-0 bg-black/60 flex flex-col justify-center items-center text-white">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white mt-10">{t('properties.title')}</h1>
                    <div className="flex gap-2 text-sm md:text-base font-medium">
                        <Link href="/" className="hover:text-accent-gold transition-colors">{t('header.home')}</Link>
                        <span className="text-accent-gold">/</span>
                        <span>{t('properties.title')}</span>
                    </div>
                </div>
            </div>

            <main className="flex-grow py-12">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left Column - Properties */}
                        <div className="lg:col-span-2">
                            <div className="mb-6">
                                <p className="text-gray-600">
                                    {t('properties.showing')} {agentProperties.length} {t('properties.properties')}
                                </p>
                            </div>

                            <div className="space-y-6">
                                {agentProperties.length > 0 ? (
                                    agentProperties.map((property) => (
                                        <div key={property.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                                            <div className="flex flex-col md:flex-row">
                                                <div className="relative w-full md:w-64 h-48 md:h-auto flex-shrink-0 shimmer-effect">
                                                    <Image
                                                        src={property.image}
                                                        alt={property.title}
                                                        fill
                                                        className="object-cover"
                                                        onLoad={(e) => {
                                                            const target = e.target as HTMLImageElement;
                                                            target.parentElement?.classList.add('loaded');
                                                        }}
                                                    />
                                                    <div className="absolute top-4 left-4">
                                                        <span className={`bg-white/40 backdrop-blur-sm text-black px-3 py-1 rounded-full text-sm font-semibold shadow-sm ${property.type === 'sale' ? 'bg-primary-green' : 'bg-secondary-green'
                                                            }`}>
                                                            {property.type === 'sale' ? t('hero.sale') : t('hero.rent')}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="p-6 flex-grow">
                                                    <div className="flex justify-between items-start mb-2">
                                                        <h3 className="text-xl font-bold text-primary-green-dark hover:text-accent-green transition-colors">
                                                            <Link href={`/property/${property.id}`}>
                                                                {property.code} {property.title}
                                                            </Link>
                                                        </h3>
                                                    </div>
                                                    <p className="text-gray-600 mb-4 flex items-center gap-2">
                                                        <i className="fas fa-map-marker-alt text-red-600"></i>
                                                        {property.location}
                                                    </p>

                                                    <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-600">
                                                        {property.bedrooms && (
                                                            <span className="flex items-center gap-1">
                                                                <i className="fas fa-bed text-accent-green"></i> {property.bedrooms} {t('properties.bedrooms')}
                                                            </span>
                                                        )}
                                                        {property.bathrooms && (
                                                            <span className="flex items-center gap-1">
                                                                <i className="fas fa-bath text-accent-green"></i> {property.bathrooms} {t('properties.bathrooms')}
                                                            </span>
                                                        )}
                                                        {property.area && (
                                                            <span className="flex items-center gap-1">
                                                                <i className="fas fa-ruler-combined text-accent-green"></i> {property.area} m²
                                                            </span>
                                                        )}
                                                    </div>

                                                    <div className="flex justify-between items-center mt-auto">
                                                        <p className="text-2xl font-bold text-primary-green">
                                                            {property.price}
                                                            {property.priceFrequency && (
                                                                <span className="text-sm font-normal text-gray-600 ml-1">
                                                                    {property.priceFrequency}
                                                                </span>
                                                            )}
                                                        </p>
                                                        <Link
                                                            href={`/property/${property.id}`}
                                                            className="px-4 py-2 bg-accent-gold text-white rounded-md hover:bg-accent-gold/90 transition-colors text-sm font-semibold"
                                                        >
                                                            {t('common.viewDetails')}
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="bg-white p-8 rounded-lg shadow text-center">
                                        <p className="text-gray-600">{t('agentDetail.noProperties')}</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Right Column - Sidebar */}
                        <div className="space-y-8">
                            {/* Agent Profile */}
                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <h3 className="text-xl font-bold text-primary-green-dark mb-4 border-b pb-2">{t('agentDetail.advisor')}</h3>
                                <div className="text-center mb-4">
                                    <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden shimmer-effect">
                                        <Image
                                            src={agent.image}
                                            alt={agent.name}
                                            fill
                                            className="object-cover"
                                            onLoad={(e) => {
                                                const target = e.target as HTMLImageElement;
                                                target.parentElement?.classList.add('loaded');
                                            }}
                                        />
                                    </div>
                                    <h4 className="text-lg font-bold text-gray-800">{agent.name}</h4>
                                    <p className="text-accent-green text-sm">{agent.role}</p>
                                </div>
                                <div className="space-y-3">
                                    <a href={`tel:${agent.phone.replace(/\s/g, '')}`} className="flex items-center gap-3 text-gray-600 hover:text-primary-green transition-colors">
                                        <i className="fas fa-phone-alt text-accent-gold w-5"></i>
                                        {agent.phone}
                                    </a>
                                    <a href={`mailto:${agent.email}`} className="flex items-center gap-3 text-gray-600 hover:text-primary-green transition-colors">
                                        <i className="fas fa-envelope text-accent-gold w-5"></i>
                                        {agent.email}
                                    </a>
                                </div>
                            </div>

                            {/* Recent Properties */}
                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <h3 className="text-xl font-bold text-primary-green-dark mb-4 border-b pb-2">{t('agentDetail.recentProperties')}</h3>
                                <div className="space-y-4">
                                    {recentProperties.map((prop) => (
                                        <div key={prop.id} className="flex gap-3 group">
                                            <div className="relative w-20 h-20 flex-shrink-0 rounded-md overflow-hidden shimmer-effect">
                                                <Image
                                                    src={prop.image}
                                                    alt={prop.title}
                                                    fill
                                                    className="object-cover group-hover:scale-110 transition-transform"
                                                    onLoad={(e) => {
                                                        const target = e.target as HTMLImageElement;
                                                        target.parentElement?.classList.add('loaded');
                                                    }}
                                                />
                                            </div>
                                            <div>
                                                <span className={`text-xs font-semibold px-2 py-0.5 rounded text-white mb-1 inline-block ${prop.type === 'sale' ? 'bg-primary-green' : 'bg-secondary-green'
                                                    }`}>
                                                    {prop.type === 'sale' ? t('hero.sale') : t('hero.rent')}
                                                </span>
                                                <h5 className="text-sm font-bold text-gray-800 leading-tight mb-1 hover:text-accent-green">
                                                    <Link href={`/property/${prop.id}`}>
                                                        {prop.code} {prop.title}
                                                    </Link>
                                                </h5>
                                                <p className="text-xs text-gray-500 mb-1">{prop.location}</p>
                                                <p className="text-sm font-bold text-primary-green">{prop.price}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Newsletter */}
                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <h3 className="text-xl font-bold text-primary-green-dark mb-4 border-b pb-2">{t('agentDetail.newsletter')}</h3>
                                <p className="text-gray-600 text-sm mb-4">{t('agentDetail.newsletterText')}</p>
                                <form className="space-y-2">
                                    <input
                                        type="email"
                                        placeholder={t('agentDetail.emailPlaceholder')}
                                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-accent-gold"
                                    />
                                    <button className="w-full bg-accent-gold text-white py-2 rounded hover:bg-accent-gold/90 transition-colors font-semibold text-sm">
                                        {t('agentDetail.subscribe')}
                                    </button>
                                </form>
                            </div>

                            {/* Links */}
                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <h3 className="text-xl font-bold text-primary-green-dark mb-4 border-b pb-2">{t('agentDetail.upcomingLinks')}</h3>
                                <ul className="space-y-2 text-sm text-gray-600">
                                    <li><Link href="/" className="hover:text-primary-green">{t('header.home')}</Link></li>
                                    <li><Link href="/#about" className="hover:text-primary-green">{t('header.about')}</Link></li>
                                    <li><Link href="/#properties" className="hover:text-primary-green">{t('header.properties')}</Link></li>
                                    <li><Link href="/#agents" className="hover:text-primary-green">{t('header.agents')}</Link></li>
                                    <li><Link href="/#contact" className="hover:text-primary-green">{t('header.contact')}</Link></li>
                                </ul>
                            </div>

                            {/* Contact */}
                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <h3 className="text-xl font-bold text-primary-green-dark mb-4 border-b pb-2">{t('agentDetail.contactUs')}</h3>
                                <p className="text-sm text-gray-600 mb-3">
                                    Río Bravo #209, Col. Sierra Morena,<br />
                                    CP. 89210, Tampico, Tam., México
                                </p>
                                <div className="space-y-2 text-sm">
                                    <a href="tel:+528332171100" className="flex items-center gap-2 text-gray-600 hover:text-primary-green">
                                        <i className="fas fa-phone-alt text-accent-gold"></i> +52 833 217 1100
                                    </a>
                                    <a href="mailto:recepcion@rodcerstate.com" className="flex items-center gap-2 text-gray-600 hover:text-primary-green">
                                        <i className="fas fa-envelope text-accent-gold"></i> recepcion@rodcerstate.com
                                    </a>
                                    <Link href="/privacy" className="flex items-center gap-2 text-gray-600 hover:text-primary-green">
                                        <i className="fas fa-lock text-accent-gold"></i> {t('footer.privacyPolicy')}
                                    </Link>
                                </div>
                            </div>

                            {/* Social */}
                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <h3 className="text-xl font-bold text-primary-green-dark mb-4 border-b pb-2">{t('agentDetail.followSocial')}</h3>
                                <p className="text-sm text-gray-600 mb-4">{t('agentDetail.followText')}</p>
                                <div className="flex gap-3">
                                    <a href="#" className="w-10 h-10 bg-primary-green text-white rounded-full flex items-center justify-center hover:bg-accent-green transition-colors">
                                        <i className="fab fa-facebook-f"></i>
                                    </a>
                                    <a href="#" className="w-10 h-10 bg-primary-green text-white rounded-full flex items-center justify-center hover:bg-accent-green transition-colors">
                                        <i className="fab fa-instagram"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
