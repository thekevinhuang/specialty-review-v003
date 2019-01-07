class ItemModelSerializer < ActiveModel::Serializer
    attributes :id, :name, :description, :overall_rating
    belongs_to :item_category
    has_many :item_model_characteristics, serializer: ItemModelCharacteristicSerializer
end