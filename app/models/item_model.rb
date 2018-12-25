class ItemModel < ActiveRecord::Base
    has_many :item_model_characteristics
    has_many :characteristics, through: :item_model_characteristics
    belongs_to :item_category

    validates :name, presence: true, uniqueness: true
    validates :description, presence: true

    def overall_rating
        
        if !self.item_model_characteristics.empty?
            total_rating = []
            self.item_model_characteristics.each do |imc|
                if numeric?(imc.average_rating)
                    imc.review_count.times do
                        total_rating.push(imc.average_rating)
                    end
                end
            end
            
            if total_rating.empty?
                total_rating = "No Ratings for any characteristics"
            else
                (total_rating.inject(0.0){|sum, num| sum + num}/total_rating.size).round(2)
            end
            
        else
            total_rating = "No Ratings for any characteristics"
        end
    end

    def self.by_item_category(item_category)
        ItemModel.where(["item_category_id = ?", item_category.id])
    end

    def self.sorted_by_overall_rating_desc(item_category)
        self.by_item_category(item_category).sort_by(&:overall_rating).reverse
    end

    private

    def numeric? string
        true if Float(string) rescue false
    end
end