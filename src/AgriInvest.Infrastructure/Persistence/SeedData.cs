using AgriInvest.Domain.Entities;
using AgriInvest.Domain.Enums;
using AgriInvest.Domain.ValueObjects;
using Microsoft.EntityFrameworkCore;

namespace AgriInvest.Infrastructure.Persistence;

public static class SeedData
{
    public static async Task InitializeAsync(AgriInvestDbContext context)
    {
        if (await context.Projects.AnyAsync())
            return;

        var utcNow = DateTime.UtcNow;

        // --- Projects ---
        var projects = new List<Project>
        {
            new()
            {
                TitleAr = "زراعة القمح الصحراوي",
                TitleEn = "Desert Wheat Cultivation",
                DescriptionAr = "مشروع رائد لزراعة القمح في المناطق الصحراوية باستخدام تقنيات الري الحديثة والبذور المقاومة للجفاف.",
                DescriptionEn = "A pioneering project for cultivating wheat in desert areas using modern irrigation techniques and drought-resistant seeds.",
                Slug = "desert-wheat-cultivation",
                Type = ProjectType.Crops,
                Status = ProjectStatus.Active,
                AreaInHectares = 500m,
                Location = new GeoLocation(27.06, 27.97, "الفرافرة، الوادي الجديد", "El-Farafra, New Valley"),
                TargetInvestment = new Money(5000000m, "EGP"),
                CurrentInvestment = new Money(3200000m, "EGP"),
                ExpectedROI = 18.5m,
                Duration = new DateRange(new DateTime(2024, 1, 1), new DateTime(2027, 12, 31)),
                FeaturedImageUrl = "/images/projects/wheat-cultivation.jpg",
                SortOrder = 1,
                IsActive = true,
                CreatedAt = utcNow
            },
            new()
            {
                TitleAr = "استصلاح بستان الزيتون",
                TitleEn = "Olive Grove Reclamation",
                DescriptionAr = "مشروع استصلاح أراضي صحراوية لزراعة أشجار الزيتون وإنتاج زيت الزيتون عالي الجودة.",
                DescriptionEn = "A land reclamation project for growing olive trees and producing high-quality olive oil in reclaimed desert land.",
                Slug = "olive-grove-reclamation",
                Type = ProjectType.LandReclamation,
                Status = ProjectStatus.Active,
                AreaInHectares = 300m,
                Location = new GeoLocation(27.08, 27.95, "الفرافرة، الوادي الجديد", "El-Farafra, New Valley"),
                TargetInvestment = new Money(8000000m, "EGP"),
                CurrentInvestment = new Money(5500000m, "EGP"),
                ExpectedROI = 22.0m,
                Duration = new DateRange(new DateTime(2023, 6, 1), new DateTime(2028, 6, 30)),
                FeaturedImageUrl = "/images/projects/olive-grove.jpg",
                SortOrder = 2,
                IsActive = true,
                CreatedAt = utcNow
            },
            new()
            {
                TitleAr = "مزرعة الأعشاب العضوية",
                TitleEn = "Organic Herbs Farm",
                DescriptionAr = "مزرعة متخصصة في إنتاج الأعشاب الطبية والعطرية العضوية للتصدير والسوق المحلي.",
                DescriptionEn = "A specialized farm producing organic medicinal and aromatic herbs for export and the local market.",
                Slug = "organic-herbs-farm",
                Type = ProjectType.OrganicFarming,
                Status = ProjectStatus.Planned,
                AreaInHectares = 150m,
                Location = new GeoLocation(27.05, 27.99, "الفرافرة، الوادي الجديد", "El-Farafra, New Valley"),
                TargetInvestment = new Money(3000000m, "EGP"),
                CurrentInvestment = new Money(800000m, "EGP"),
                ExpectedROI = 25.0m,
                Duration = new DateRange(new DateTime(2025, 1, 1), new DateTime(2028, 12, 31)),
                FeaturedImageUrl = "/images/projects/herbs-farm.jpg",
                SortOrder = 3,
                IsActive = true,
                CreatedAt = utcNow
            },
            new()
            {
                TitleAr = "مزرعة الثروة الحيوانية",
                TitleEn = "Livestock Ranch",
                DescriptionAr = "مشروع تربية المواشي والإنتاج الحيواني المتكامل مع المراعي الطبيعية المستصلحة.",
                DescriptionEn = "An integrated livestock breeding and animal production project with reclaimed natural pastures.",
                Slug = "livestock-ranch",
                Type = ProjectType.Livestock,
                Status = ProjectStatus.Active,
                AreaInHectares = 1000m,
                Location = new GeoLocation(27.04, 27.96, "الفرافرة، الوادي الجديد", "El-Farafra, New Valley"),
                TargetInvestment = new Money(12000000m, "EGP"),
                CurrentInvestment = new Money(7800000m, "EGP"),
                ExpectedROI = 15.0m,
                Duration = new DateRange(new DateTime(2023, 1, 1), new DateTime(2028, 12, 31)),
                FeaturedImageUrl = "/images/projects/livestock-ranch.jpg",
                SortOrder = 4,
                IsActive = true,
                CreatedAt = utcNow
            }
        };

        await context.Projects.AddRangeAsync(projects);
        await context.SaveChangesAsync();

        // --- Success Stories ---
        var stories = new List<SuccessStory>
        {
            new()
            {
                TitleAr = "تحويل 200 فدان من الصحراء إلى حقول قمح مزدهرة",
                TitleEn = "Transforming 200 Acres of Desert into Thriving Wheat Fields",
                ContentAr = "نجح مشروع زراعة القمح الصحراوي في تحويل أراضٍ قاحلة إلى حقول إنتاجية خلال 18 شهرًا فقط، محققًا عوائد تجاوزت التوقعات.",
                ContentEn = "The Desert Wheat Cultivation project successfully transformed barren land into productive fields within just 18 months, achieving returns that exceeded expectations.",
                Slug = "desert-wheat-success",
                BeforeImageUrl = "/images/stories/wheat-before.jpg",
                AfterImageUrl = "/images/stories/wheat-after.jpg",
                TestimonialAr = "لقد أثبت هذا المشروع أن الصحراء يمكن أن تتحول إلى أرض خضراء منتجة.",
                TestimonialEn = "This project has proven that the desert can be transformed into productive green land.",
                TestimonialAuthor = "Ahmed Hassan",
                ROIAchieved = 21.5m,
                AreaTransformed = 84m,
                FeaturedImageUrl = "/images/stories/wheat-featured.jpg",
                PublishDate = new DateTime(2025, 6, 15),
                IsFeatured = true,
                ProjectId = 1,
                IsActive = true,
                CreatedAt = utcNow
            },
            new()
            {
                TitleAr = "أول حصاد زيتون من أرض صحراوية مستصلحة",
                TitleEn = "First Olive Harvest from Reclaimed Desert Land",
                ContentAr = "بعد عامين من العمل الدؤوب، أثمرت أشجار الزيتون المزروعة في الأراضي المستصلحة عن أول محصول بجودة عالمية.",
                ContentEn = "After two years of dedicated work, olive trees planted in reclaimed land produced their first harvest of world-class quality.",
                Slug = "olive-harvest-success",
                BeforeImageUrl = "/images/stories/olive-before.jpg",
                AfterImageUrl = "/images/stories/olive-after.jpg",
                TestimonialAr = "جودة الزيتون تنافس أفضل المنتجات العالمية.",
                TestimonialEn = "The olive quality competes with the best international products.",
                TestimonialAuthor = "Fatima Al-Sayed",
                ROIAchieved = 19.8m,
                AreaTransformed = 126m,
                FeaturedImageUrl = "/images/stories/olive-featured.jpg",
                PublishDate = new DateTime(2025, 9, 1),
                IsFeatured = true,
                ProjectId = 2,
                IsActive = true,
                CreatedAt = utcNow
            },
            new()
            {
                TitleAr = "نجاح برنامج التربية المتكاملة للثروة الحيوانية",
                TitleEn = "Integrated Livestock Breeding Program Success",
                ContentAr = "حقق برنامج التربية المتكاملة نتائج استثنائية في تحسين سلالات الماشية وزيادة الإنتاجية.",
                ContentEn = "The integrated breeding program achieved exceptional results in improving livestock breeds and increasing productivity.",
                Slug = "livestock-breeding-success",
                BeforeImageUrl = "/images/stories/livestock-before.jpg",
                AfterImageUrl = "/images/stories/livestock-after.jpg",
                TestimonialAr = "زادت إنتاجية القطيع بنسبة 40% خلال عام واحد.",
                TestimonialEn = "Herd productivity increased by 40% within one year.",
                TestimonialAuthor = "Mohamed Khalil",
                ROIAchieved = 17.2m,
                AreaTransformed = 420m,
                FeaturedImageUrl = "/images/stories/livestock-featured.jpg",
                PublishDate = new DateTime(2025, 11, 10),
                IsFeatured = true,
                ProjectId = 4,
                IsActive = true,
                CreatedAt = utcNow
            }
        };

        await context.SuccessStories.AddRangeAsync(stories);

        // --- Team Members ---
        var teamMembers = new List<TeamMember>
        {
            new()
            {
                NameAr = "أحمد مصطفى",
                NameEn = "Ahmed Mostafa",
                PositionAr = "الرئيس التنفيذي",
                PositionEn = "Chief Executive Officer",
                BioAr = "أكثر من 20 عامًا من الخبرة في القطاع الزراعي والاستثمار.",
                BioEn = "Over 20 years of experience in the agricultural sector and investment.",
                PhotoUrl = "/images/team/ahmed-mostafa.jpg",
                LinkedInUrl = "https://linkedin.com/in/ahmed-mostafa",
                SortOrder = 1,
                IsActive = true,
                CreatedAt = utcNow
            },
            new()
            {
                NameAr = "سارة علي",
                NameEn = "Sara Ali",
                PositionAr = "المدير التقني",
                PositionEn = "Chief Technology Officer",
                BioAr = "متخصصة في التكنولوجيا الزراعية والتحول الرقمي في القطاع الزراعي.",
                BioEn = "Specialized in agricultural technology and digital transformation in the agricultural sector.",
                PhotoUrl = "/images/team/sara-ali.jpg",
                LinkedInUrl = "https://linkedin.com/in/sara-ali",
                SortOrder = 2,
                IsActive = true,
                CreatedAt = utcNow
            },
            new()
            {
                NameAr = "خالد عبدالرحمن",
                NameEn = "Khaled Abdelrahman",
                PositionAr = "مدير العمليات",
                PositionEn = "Chief Operating Officer",
                BioAr = "خبير في إدارة العمليات الزراعية واسعة النطاق.",
                BioEn = "Expert in managing large-scale agricultural operations.",
                PhotoUrl = "/images/team/khaled-abdelrahman.jpg",
                LinkedInUrl = "https://linkedin.com/in/khaled-abdelrahman",
                SortOrder = 3,
                IsActive = true,
                CreatedAt = utcNow
            },
            new()
            {
                NameAr = "منى حسن",
                NameEn = "Mona Hassan",
                PositionAr = "رئيس قسم الزراعة",
                PositionEn = "Head of Agriculture",
                BioAr = "حاصلة على الدكتوراه في العلوم الزراعية مع خبرة 15 عامًا في استصلاح الأراضي.",
                BioEn = "Holds a PhD in Agricultural Sciences with 15 years of experience in land reclamation.",
                PhotoUrl = "/images/team/mona-hassan.jpg",
                LinkedInUrl = "https://linkedin.com/in/mona-hassan",
                SortOrder = 4,
                IsActive = true,
                CreatedAt = utcNow
            },
            new()
            {
                NameAr = "يوسف إبراهيم",
                NameEn = "Youssef Ibrahim",
                PositionAr = "رئيس القسم المالي",
                PositionEn = "Head of Finance",
                BioAr = "محاسب قانوني معتمد مع خبرة واسعة في التمويل الزراعي.",
                BioEn = "Certified public accountant with extensive experience in agricultural financing.",
                PhotoUrl = "/images/team/youssef-ibrahim.jpg",
                LinkedInUrl = "https://linkedin.com/in/youssef-ibrahim",
                SortOrder = 5,
                IsActive = true,
                CreatedAt = utcNow
            }
        };

        await context.TeamMembers.AddRangeAsync(teamMembers);

        // --- Page Content ---
        var pageContents = new List<PageContent>
        {
            new()
            {
                PageKey = "home",
                SectionKey = "hero",
                ContentAr = "استثمر في مستقبل الزراعة المصرية. نحول الصحراء إلى أراضٍ خضراء منتجة في الفرافرة.",
                ContentEn = "Invest in the future of Egyptian agriculture. We transform desert into productive green land in El-Farafra.",
                ImageUrl = "/images/pages/home-hero.jpg",
                MetadataJson = "{\"ctaTextAr\": \"اكتشف المشاريع\", \"ctaTextEn\": \"Discover Projects\"}",
                SortOrder = 1,
                IsActive = true,
                CreatedAt = utcNow
            },
            new()
            {
                PageKey = "home",
                SectionKey = "key-metrics",
                ContentAr = "إنجازاتنا بالأرقام",
                ContentEn = "Our Achievements in Numbers",
                MetadataJson = "{\"totalHectares\": 1950, \"totalInvestment\": 28000000, \"projectCount\": 4, \"investorCount\": 150}",
                SortOrder = 2,
                IsActive = true,
                CreatedAt = utcNow
            },
            new()
            {
                PageKey = "about",
                SectionKey = "mission",
                ContentAr = "مهمتنا هي تحويل الأراضي الصحراوية في مصر إلى مشاريع زراعية مستدامة ومربحة، مع توفير فرص استثمارية آمنة ومجزية.",
                ContentEn = "Our mission is to transform Egypt's desert lands into sustainable and profitable agricultural projects, while providing safe and rewarding investment opportunities.",
                ImageUrl = "/images/pages/about-mission.jpg",
                SortOrder = 1,
                IsActive = true,
                CreatedAt = utcNow
            },
            new()
            {
                PageKey = "about",
                SectionKey = "vision",
                ContentAr = "نتطلع لأن نكون الشركة الرائدة في الاستثمار الزراعي في شمال أفريقيا، ونموذجًا عالميًا في تحويل الصحراء إلى أراضٍ منتجة.",
                ContentEn = "We aspire to be the leading agricultural investment company in North Africa and a global model for transforming desert into productive land.",
                ImageUrl = "/images/pages/about-vision.jpg",
                SortOrder = 2,
                IsActive = true,
                CreatedAt = utcNow
            }
        };

        await context.PageContents.AddRangeAsync(pageContents);

        // --- Media Items ---
        var mediaItems = new List<MediaItem>
        {
            new()
            {
                TitleAr = "إطلاق مشروع زراعة القمح الصحراوي",
                TitleEn = "Launch of Desert Wheat Cultivation Project",
                DescriptionAr = "أعلنت أجري إنفست عن إطلاق أحدث مشاريعها لزراعة القمح في منطقة الفرافرة.",
                DescriptionEn = "AgriInvest announced the launch of its latest wheat cultivation project in the El-Farafra region.",
                Type = MediaType.News,
                Url = "/images/media/wheat-launch.jpg",
                ThumbnailUrl = "/images/media/wheat-launch-thumb.jpg",
                PublishDate = new DateTime(2025, 3, 15),
                IsFeatured = true,
                Tags = "wheat,launch,project",
                IsActive = true,
                CreatedAt = utcNow
            },
            new()
            {
                TitleAr = "تقرير عن موسم حصاد الزيتون",
                TitleEn = "Olive Harvest Season Report",
                DescriptionAr = "تقرير شامل عن نتائج موسم حصاد الزيتون الأول من الأراضي المستصلحة.",
                DescriptionEn = "A comprehensive report on the results of the first olive harvest season from reclaimed lands.",
                Type = MediaType.News,
                Url = "/images/media/olive-harvest.jpg",
                ThumbnailUrl = "/images/media/olive-harvest-thumb.jpg",
                PublishDate = new DateTime(2025, 10, 20),
                IsFeatured = false,
                Tags = "olive,harvest,report",
                IsActive = true,
                CreatedAt = utcNow
            },
            new()
            {
                TitleAr = "صور جوية لمشروع استصلاح الأراضي",
                TitleEn = "Aerial Photos of Land Reclamation Project",
                DescriptionAr = "مجموعة من الصور الجوية توضح تقدم أعمال استصلاح الأراضي في الفرافرة.",
                DescriptionEn = "A collection of aerial photos showing the progress of land reclamation work in El-Farafra.",
                Type = MediaType.Photo,
                Url = "/images/media/aerial-reclamation.jpg",
                ThumbnailUrl = "/images/media/aerial-reclamation-thumb.jpg",
                PublishDate = new DateTime(2025, 7, 5),
                IsFeatured = true,
                Tags = "aerial,reclamation,photo",
                IsActive = true,
                CreatedAt = utcNow
            },
            new()
            {
                TitleAr = "معرض صور المزرعة العضوية",
                TitleEn = "Organic Farm Photo Gallery",
                DescriptionAr = "جولة مصورة داخل مزرعة الأعشاب العضوية ومراحل الإنتاج.",
                DescriptionEn = "A photo tour inside the organic herbs farm and its production stages.",
                Type = MediaType.Photo,
                Url = "/images/media/organic-farm-gallery.jpg",
                ThumbnailUrl = "/images/media/organic-farm-gallery-thumb.jpg",
                PublishDate = new DateTime(2025, 5, 12),
                IsFeatured = false,
                Tags = "organic,farm,gallery",
                IsActive = true,
                CreatedAt = utcNow
            },
            new()
            {
                TitleAr = "بيان صحفي: شراكة جديدة مع وزارة الزراعة",
                TitleEn = "Press Release: New Partnership with Ministry of Agriculture",
                DescriptionAr = "أجري إنفست توقع اتفاقية شراكة مع وزارة الزراعة لتوسيع مشاريع الاستصلاح.",
                DescriptionEn = "AgriInvest signs a partnership agreement with the Ministry of Agriculture to expand reclamation projects.",
                Type = MediaType.News,
                Url = "/images/media/partnership-announcement.jpg",
                ThumbnailUrl = "/images/media/partnership-announcement-thumb.jpg",
                PublishDate = new DateTime(2025, 12, 1),
                IsFeatured = true,
                Tags = "partnership,government,expansion",
                IsActive = true,
                CreatedAt = utcNow
            }
        };

        await context.MediaItems.AddRangeAsync(mediaItems);

        await context.SaveChangesAsync();
    }
}
