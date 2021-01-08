using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace ContactManagementAPI.Models
{
    [Table("contacts")]
    public class Contact
    {
        [Column("id")]
        public int Id { get; set; }
        [Column("name")]
        public string Name { get; set; }
        [Column("description")]
        public string Description { get; set; }
        [Column("birthdate")]
        public DateTime BirthDate { get; set; }
        [Column("group")]
        public int Group { get; set; }
        [JsonIgnore]
        [ForeignKey("Group")]
        public Group GroupObj { get; set; }
        [Column("created_timestamp")]
        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        public DateTime Created { get; set; }
        [Column("updated_timestamp")]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public DateTime Updated { get; set; }
        [Column("favorite_flag")]
        public string Flag { get; set; }
    }
}