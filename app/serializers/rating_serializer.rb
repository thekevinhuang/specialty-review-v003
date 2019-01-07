class RatingSerializer < ActiveModel::Serializer
    attributes :id, :rating, :description
    belongs_to :user
    belongs_to :item_model_characteristic
end